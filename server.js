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

const app = express();

// =====================
// Middleware
// =====================
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Adjust frontend URL
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
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super-secret');
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
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
// Server Startup
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`WOXUS V1 Server running on port ${PORT}`);
});
