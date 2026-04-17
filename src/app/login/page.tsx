"use client";

import React, { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chrome, ArrowLeft, Zap, Shield, Globe, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import Background from "@/components/visuals/Background";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(true);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push(callbackUrl);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router, callbackUrl]);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setErrorCode(null);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      const benign = [
        'auth/popup-blocked',
        'auth/cancelled-popup-request',
        'auth/popup-closed-by-user',
      ];
      if (!benign.includes(error?.code)) {
        setErrorCode(error.code || "An unexpected error occurred");
      }
      setIsSigningIn(false);
    }
  };

  const woxusLogoSVG = (
    <svg viewBox="0 0 100 100" fill="none" strokeWidth="12" strokeLinejoin="miter">
      <defs>
        <linearGradient id="foxModalLogin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d8b4fe" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
      </defs>
      <path d="M 75 25 L 20 60" stroke="url(#foxModalLogin)" />
      <path d="M 75 25 L 90 60 L 50 90 L 10 60 L 25 25 L 80 60" stroke="url(#foxModalLogin)" />
    </svg>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16"
        >
          {woxusLogoSVG}
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white relative flex items-center justify-center p-6 overflow-hidden">
      <Background />

      {/* Decorative Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full animate-pulse-slow font-delay-2000" />

      <div className="absolute top-10 left-6 md:left-10 z-50">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-all group"
          >
            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-bold uppercase tracking-[0.2em] text-[10px]">Return to System</span>
          </motion.button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "circOut" }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className="relative glass-premium p-10 md:p-14 rounded-[3.5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

          {/* Header */}
          <div className="text-center mb-12 relative">
            <motion.div 
              className="w-24 h-24 mx-auto mb-8 relative"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full" />
              <div className="relative z-10 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                {woxusLogoSVG}
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
              Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 italic">Auth</span>
            </h1>
            <p className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-bold">
              Secure Neural Gateway
            </p>
          </div>

          {/* Features / Benefits during login */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
               <Zap className="w-4 h-4 text-purple-400" />
               <span className="text-[9px] uppercase tracking-widest font-bold text-white/50">High Speed</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
               <Shield className="w-4 h-4 text-cyan-400" />
               <span className="text-[9px] uppercase tracking-widest font-bold text-white/50">Secured</span>
            </div>
          </div>

          {/* Login Button Area */}
          <div className="space-y-6">
            <motion.button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative group overflow-hidden py-5 rounded-3xl"
            >
              {/* Button Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] animate-gradient-shimmer" />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex items-center justify-center gap-4 text-white font-black uppercase tracking-[0.3em] text-xs">
                {isSigningIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Synchronizing...</span>
                  </>
                ) : (
                  <>
                    <Chrome className="w-4 h-4" />
                    <span>Continue with Google</span>
                  </>
                )}
              </div>
            </motion.button>

            <AnimatePresence>
              {errorCode && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                >
                  <Lock className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider">
                    {errorCode}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Info */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-6">
            <div className="flex gap-6">
              <Globe className="w-4 h-4 text-white/20" />
              <Zap className="w-4 h-4 text-white/20" />
              <Lock className="w-4 h-4 text-white/20" />
            </div>
            <p className="text-center text-white/20 text-[9px] uppercase tracking-[0.4em] font-bold leading-relaxed">
              Legal Privacy Encryption <br /> Standard protocol v0.1
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617]" />}>
      <LoginContent />
    </Suspense>
  );
}
