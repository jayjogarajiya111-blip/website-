"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, FileText, LogOut } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

export interface NavbarProps { }

export default function Navbar() {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Track Authentication State — error handler prevents "Pending promise" console errors
    useEffect(() => {
        let active = true;
        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                if (active) {
                    setUser(currentUser);
                    setLoading(false);
                }
            },
            (error: any) => {
                // Suppress known benign Firebase internal assertion errors
                if (error.message && error.message.includes('INTERNAL ASSERTION FAILED')) return;
                console.warn('Auth state error:', error.code || error.message);
                if (active) setLoading(false);
            }
        );
        return () => { active = false; unsubscribe(); };
    }, []);

    // Close dropdown when clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            await signInWithPopup(auth, provider);
        } catch (error: any) {
            // Suppress all benign popup / internal errors silently
            const benign = [
                'auth/popup-blocked',
                'auth/cancelled-popup-request',
                'auth/popup-closed-by-user',
            ];
            if (benign.includes(error?.code)) return; // user closed popup — not an error
            if (error?.message?.includes('INTERNAL ASSERTION FAILED')) return; // firebase internal
            if (error?.code === 'auth/invalid-api-key') {
                alert("Firebase config error — check src/lib/firebase.ts");
            } else {
                console.warn("Sign-In Error:", error?.code || error?.message);
            }
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setDropdownOpen(false);
        } catch (error) {
            console.error("Sign Out Error:", error);
        }
    };

    // The perfect precise topological path of the provided logo
    const woxusLogoSVG = (
        <svg viewBox="0 0 100 100" fill="none" strokeWidth="12" strokeLinejoin="miter">
            <defs>
                <linearGradient id="foxModal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d8b4fe" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#4c1d95" />
                </linearGradient>
            </defs>
            <path d="M 75 25 L 20 60" stroke="url(#foxModal)" />
            <path d="M 75 25 L 90 60 L 50 90 L 10 60 L 25 25 L 80 60" stroke="url(#foxModal)" />
        </svg>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-full neon-border bg-[#0a0f1c]/80 backdrop-blur-xl transition-all">
                {/* Logo Area */}
                <motion.div
                    className="flex items-center gap-3 cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                >
                    {/* Perfect Recreated Fox/M Logo */}
                    <div className="w-10 h-10 flex items-center justify-center relative">
                        <motion.div
                            className="w-full h-full drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {woxusLogoSVG}
                        </motion.div>
                    </div>

                    <span className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 uppercase drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                        Woxus
                    </span>
                </motion.div>

                {/* Auth & Navigation Buttons */}
                <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                    <Link href="/docs">
                        <motion.button
                            whileHover={{ scale: 1.05, textShadow: "0 0 8px rgba(168,85,247,0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors text-sm font-medium px-4 py-2"
                        >
                            <FileText className="w-4 h-4" />
                            <span className="hidden sm:inline">Documentation</span>
                        </motion.button>
                    </Link>

                    <motion.button
                        onClick={() => setAboutOpen(true)}
                        whileHover={{ scale: 1.05, textShadow: "0 0 8px rgba(168,85,247,0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors text-sm font-medium px-4 py-2 border-l border-white/10"
                    >
                        <User className="w-4 h-4" />
                        <span className="hidden sm:inline">About</span>
                    </motion.button>

                    {loading ? (
                        <div className="w-10 h-10 rounded-full border-2 border-purple-500/50 animate-pulse bg-purple-900/50"></div>
                    ) : !user ? (
                        // Real Google SignIn button trigger!
                        <motion.button
                            onClick={handleGoogleSignIn}
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                            <User className="w-4 h-4" />
                            <span className="hidden sm:inline">Sign In</span>
                        </motion.button>
                    ) : (
                        // Real Authenticated Area
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="w-10 h-10 rounded-full border-2 border-purple-500 overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:border-purple-300 transition-colors"
                            >
                                <img src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"} alt="Real Google Profile" className="w-full h-full object-cover" />
                            </motion.div>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-3 w-48 bg-[#0d1527] border border-[#1e293b] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden z-[60]"
                                    >
                                        <div className="px-4 py-3 border-b border-[#1e293b] bg-white/5">
                                            <p className="text-sm font-medium text-white truncate">{user.displayName || "User"}</p>
                                            <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Log Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* About Woxus Modal */}
            <AnimatePresence>
                {aboutOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
                        onClick={() => setAboutOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="glass max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 md:p-12 relative border border-purple-500/30 rounded-3xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setAboutOpen(false)}
                                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 flex items-center justify-center">
                                    {woxusLogoSVG}
                                </div>
                                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                                    About <span className="text-cyber-cyan italic">Woxus</span>
                                </h2>
                            </div>

                            <div className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-base">
                                <p>
                                    Woxus is more than just a piece of code; it is a vision born out of a passion to redefine the human-technology bond. As a growing startup, we have poured our hearts, late nights, and every ounce of our dedication into creating an AI assistant that doesn't just process commands but understands the essence of your needs. Our journey is fueled by the dream of making advanced intelligence accessible, intuitive, and deeply personal for everyone.
                                </p>
                                <p>
                                    We believe that every great innovation starts with a small step and a lot of courage. Woxus is our heartbeat, and we are working tirelessly to evolve it into the most reliable companion in your digital life. However, as we are in our early stages, we humbly ask for your patience and support.
                                </p>
                                <p>
                                    We know we aren't perfect yet. If you encounter any glitches or if Woxus falls short of your expectations, please accept our sincerest apologies. We are constantly learning, refining, and implementing new updates to fix every issue you face. Your feedback is the fuel that drives our improvement.
                                </p>

                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">Why Join Our Journey?</h3>
                                    <ul className="space-y-4">
                                        <li className="flex gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan mt-2 flex-shrink-0" />
                                            <div>
                                                <span className="text-white font-bold block mb-1">Heartfelt Innovation:</span>
                                                Built with a genuine desire to solve real-world problems.
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan mt-2 flex-shrink-0" />
                                            <div>
                                                <span className="text-white font-bold block mb-1">Startup Spirit:</span>
                                                We are agile, transparent, and dedicated to our users.
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan mt-2 flex-shrink-0" />
                                            <div>
                                                <span className="text-white font-bold block mb-1">Constant Evolution:</span>
                                                We don’t just ignore mistakes; we learn from them and grow.
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan mt-2 flex-shrink-0" />
                                            <div>
                                                <span className="text-white font-bold block mb-1">Your Community:</span>
                                                When you use Woxus, you aren’t just a user; you are a partner in our growth.
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <p className="mt-8 italic text-white/60">
                                    We invite you to stand by us as we navigate the challenges of the tech world. Your support means everything to us, and we promise to keep pushing the boundaries of what Woxus can achieve for you. Thank you for believing in our dream and for being a part of the Woxus family.
                                </p>

                                <div className="flex justify-center pt-8">
                                    <button
                                        onClick={() => setAboutOpen(false)}
                                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all"
                                    >
                                        Got it
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
