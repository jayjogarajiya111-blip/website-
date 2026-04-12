// Firebase App imports
import { initializeApp as initFirebase, getApps as getAppsFirebase, getApp as getAppFirebase } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdT0PfBMSSeG4jc2So_x-mW_n3vO6ksHA",
  authDomain: "woxus---ai.firebaseapp.com",
  projectId: "woxus---ai",
  storageBucket: "woxus---ai.firebasestorage.app",
  messagingSenderId: "285679843484",
  appId: "1:285679843484:web:0e5000535ae10c58b5d559",
  measurementId: "G-BG8F5DECWX"
};

// Initialize Firebase only once — prevents "Pending promise was never set" error
// caused by React Strict Mode double-mounting or hot-reload re-initialization
const app = getAppsFirebase().length > 0 ? getAppFirebase() : initFirebase(firebaseConfig);

// Use a module-level singleton for auth — safe across re-renders
let _auth: ReturnType<typeof getAuth> | null = null;
function getAuthSingleton() {
  if (!_auth) {
    _auth = getAuth(app);
  }
  return _auth;
}

import { getFirestore } from "firebase/firestore";

const auth = getAuthSingleton();
const db = getFirestore(app);

export { auth, app, db };
