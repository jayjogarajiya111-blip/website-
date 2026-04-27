require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const admin = require('firebase-admin');
const crypto = require('crypto');

// Initialize Firebase Admin
admin.initializeApp({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'woxus-ai'
});
const db = admin.firestore();

const app = express();

// =====================
// Middleware
// =====================
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
    'https://woxus.tech'
  ],
  credentials: true
})); // Allow Next.js, Vite, and Production domain
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: 'woxus-session-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// =====================
// MongoDB Connection
// =====================
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/woxus_v1';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error', err));

// =====================
// Models
// =====================
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  profilePicture: String,
  provider: String, // 'google' | 'microsoft'
  providerId: String
});
const User = mongoose.model('User', userSchema);

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// =====================
// Passport Setup (OAuth)
// =====================
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try { const user = await User.findById(id); done(null, user); }
  catch (err) { done(err); }
});

const generateTokenAndSetCookie = (res, user) => {
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'super-secret', { expiresIn: '7d' });
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });
};

// Google OAuth
if (process.env.GOOGLE_CLIENT_ID) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id, provider: 'google' });
      if (!user) {
        user = await User.create({
          email: profile.emails[0].value,
          name: profile.displayName,
          profilePicture: profile.photos[0].value,
          provider: 'google',
          providerId: profile.id
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));
}

// Microsoft OAuth
if (process.env.MICROSOFT_CLIENT_ID) {
  passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: '/api/auth/microsoft/callback',
    scope: ['user.read']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id, provider: 'microsoft' });
      if (!user) {
        user = await User.create({
          email: profile.emails?.[0]?.value || `${profile.id}@microsoft.com`,
          name: profile.displayName,
          profilePicture: '', // Optional: Fetch graph API picture if needed
          provider: 'microsoft',
          providerId: profile.id
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));
}

// =====================
// Auth Routes
// =====================
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/api/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  generateTokenAndSetCookie(res, req.user);
  res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
});

app.get('/api/auth/microsoft', passport.authenticate('microsoft'));
app.get('/api/auth/microsoft/callback', passport.authenticate('microsoft', { session: false }), (req, res) => {
  generateTokenAndSetCookie(res, req.user);
  res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
});

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies.token;

  // 1. Try Firebase Token (Authorization Header)
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const idToken = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = { email: decodedToken.email, uid: decodedToken.uid };
      return next();
    } catch (err) {
      console.error("Firebase Token Verification Failed:", err);
      return res.status(401).json({ error: 'Invalid Firebase token' });
    }
  }

  // 2. Try JWT Cookie (Legacy/Alternative)
  if (cookieToken) {
    try {
      const decoded = jwt.verify(cookieToken, process.env.JWT_SECRET || 'super-secret');
      req.user = await User.findById(decoded.id);
      if (req.user) return next();
    } catch (err) {
      console.error("JWT Verification Failed:", err);
    }
  }

  return res.status(401).json({ error: 'Unauthorized' });
};

app.get('/api/auth/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// =====================
// AI Terminal Route (Gemini 2.0 Flash)
// =====================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
app.post('/api/command', verifyToken, async (req, res) => {
  try {
    const { command } = req.body;
    if (!command) return res.status(400).json({ error: "Missing command" });

    // Using Gemini 2.0 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `You are WOXX (Logic Engine). Based on this text, execute a pseudo-terminal action and explain it. Command: "${command}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({ output: response.text() });
  } catch (err) {
    console.error("AI Command Error:", err);
    res.status(500).json({ error: "Failed to parse command" });
  }
});

// =====================
// Feedback Experience Route
// =====================
app.post('/api/feedback', verifyToken, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    const feedback = await Feedback.create({ userId: req.user._id, message });
    res.status(201).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// =====================
// Woxus Subscription Logic
// =====================

/**
 * WOXUS TOKEN GENERATOR LOGIC
 * Generates a unique token and saves it to Firestore.
 */
async function activateWoxusSubscription(userEmail, planType) {
  // 1. Unique Token banavo (WOXUS-XXXX-XXXX)
  const token = `WOXUS-${crypto.randomBytes(4).toString('hex').toUpperCase().match(/.{1,4}/g).join('-')}`;

  const now = admin.firestore.Timestamp.now();
  const days = planType === '3month' ? 90 : 30;
  const subEnd = admin.firestore.Timestamp.fromDate(new Date(Date.now() + days * 24 * 60 * 60 * 1000));

  // 2. Firebase ma 'tokens' ma save karo (EXE mate)
  await db.collection('tokens').doc(token).set({
    token: token,
    userId: userEmail,
    subscriptionPlan: planType,
    subscriptionEnd: subEnd,
    isActive: true,
    createdAt: now
  });

  // 3. User na personal record ma update karo (UI mate)
  await db.collection('subscriptions').doc(userEmail).set({
    userId: userEmail,
    plan: planType,
    endDate: subEnd,
    isActive: true,
    currentToken: token
  }, { merge: true });

  return token;
}

/**
 * Stripe/Razorpay Webhook Handler
 */
app.post('/stripe-webhook', async (req, res) => {
  // Note: In production, you should verify the payment signature.
  try {
    const { customerEmail, planType } = req.body;

    if (!customerEmail) {
      return res.status(400).json({ error: "Missing customerEmail" });
    }

    const token = await activateWoxusSubscription(customerEmail, planType || '1month');

    console.log("User activated with token:", token);
    res.json({ success: true, token });
  } catch (error) {
    console.error("Webhook Error:", error);
    res.status(500).json({ error: "Webhook failed" });
  }
});

/**
 * Fetch current user's subscription token
 */
app.get('/api/subscription/my-token', verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const subDoc = await db.collection('subscriptions').doc(userEmail).get();

    if (!subDoc.exists) {
      return res.status(404).json({ error: "No active subscription found" });
    }

    res.json({
      success: true,
      ...subDoc.data()
    });
  } catch (error) {
    console.error("Fetch Subscription Error:", error);
    res.status(500).json({ error: "Failed to fetch subscription" });
  }
});

// =====================
// Server Startup
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`WOXUS V1 Server running on port ${PORT}`);
});
