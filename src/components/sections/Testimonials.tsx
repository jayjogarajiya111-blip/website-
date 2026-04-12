"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, setDoc, doc } from "firebase/firestore";

export const initialTestimonials: any[] = [];

export const FeedbackCard = ({ item }: { item: any }) => {
    const [expanded, setExpanded] = useState(false);

    const content = item.text || item.message || "";
    // Check if word count is > 20
    const words = content.split(/\s+/);
    const isLong = words.length > 20;

    const displayText = (isLong && !expanded)
        ? words.slice(0, 20).join(" ") + "... "
        : content;

    return (
        <div className="flex-shrink-0 w-[380px] p-6 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-cyber-cyan/30 hover:bg-white/10 group overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <div className="flex flex-col h-full justify-between gap-4">
                <div className="flex items-center gap-3">
                    {item.avatar ? (
                        <img src={item.avatar} alt="Profile" className="w-10 h-10 rounded-full border border-white/10" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-cyber-cyan/20 border border-cyber-cyan/50 flex items-center justify-center text-cyber-cyan font-bold">
                            {(item.name || item.displayName || "U").charAt(0).toUpperCase()}
                        </div>
                    )}
                    <span className="text-cyber-cyan font-bold text-sm tracking-wider">@{item.name || item.displayName}</span>
                </div>

                <p className="text-white/80 text-[15px] italic leading-relaxed font-light font-sans tracking-wide mt-2">
                    "{displayText}"
                    {isLong && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setExpanded(!expanded);
                            }}
                            className="text-cyber-cyan ml-2 font-bold text-xs hover:text-white transition-colors"
                        >
                            {expanded ? "less" : "more..."}
                        </button>
                    )}
                </p>
            </div>
        </div>
    );
};

export default function Testimonials() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [focused, setFocused] = useState<string | null>(null);
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [message, setMessage] = useState("");
    const [wordCount, setWordCount] = useState(0);
    const [feedbacks, setFeedbacks] = useState(initialTestimonials);

    useEffect(() => {
        let unsubscribeAuth = () => { };
        try {
            unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
                setUser(currentUser);
                if (currentUser) {
                    try {
                        await setDoc(doc(db, "users", currentUser.uid), {
                            uid: currentUser.uid,
                            email: currentUser.email,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                            lastLogin: serverTimestamp()
                        }, { merge: true });
                    } catch (e) {
                        console.warn("Users DB error:", e);
                    }
                }
            }, (error) => {
                console.warn("Auth state error safely caught:", error);
            });
        } catch (err) {
            console.warn("Firebase Auth listener setup error:", err);
        }

        // Live connection to Firebase Firestore Database
        const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
        const unsubscribeDB = onSnapshot(q, (snapshot) => {
            const liveFeedbacks = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFeedbacks(liveFeedbacks);
        }, (error) => {
            console.warn("Firestore access error. Check your database rules.", error);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeDB();
        };
    }, []);

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const words = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
        if (words <= 200) {
            setMessage(text);
            setWordCount(words);
        } else {
            // Trim to max 200 words
            const trimmed = text.trim().split(/\s+/).slice(0, 200).join(" ");
            setMessage(trimmed);
            setWordCount(200);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error: any) {
            if (error?.code === 'auth/popup-closed-by-user') {
                console.info("Sign-in popup was closed by user.");
            } else {
                console.warn("Sign-in issue:", error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            handleGoogleSignIn();
            return;
        }

        if (!message.trim()) return;

        setStatus("submitting");

        try {
            // Push review to Google Firebase Live Database
            await addDoc(collection(db, "feedbacks"), {
                text: message,
                name: user.displayName?.toLowerCase().replace(/\s+/g, '') || "user",
                avatar: user.photoURL || null,
                createdAt: serverTimestamp()
            });

            setStatus("success");
            setMessage("");
            setWordCount(0);
        } catch (error) {
            console.error("Error saving review: ", error);
            alert("Database Error! Make sure your Firebase Rules allow Writes.");
            setStatus("idle");
        }
    };

    return (
        <section className="py-24 relative overflow-hidden" id="reviews">
            <style jsx>{`
                @keyframes scroll-left {
                    from { transform: translateX(100vw); }
                    to { transform: translateX(-100%); }
                }
                @keyframes scroll-right {
                    from { transform: translateX(-100vw); }
                    to { transform: translateX(100%); }
                }
                .animate-scroll-left {
                    animation: scroll-left 40s linear infinite;
                    width: max-content;
                }
                .marquee-container:hover .animate-scroll-left {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="max-w-[100vw] mx-auto">
                <div className="flex items-center justify-between px-10 md:px-20 mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-white">What People Say</h2>
                    {feedbacks.length > 0 && (
                        <Link href="/shoutouts">
                            <span className="text-blue-500 hover:text-blue-400 font-bold text-sm tracking-wider hover:underline transition-all hidden md:block">
                                View all &rarr;
                            </span>
                        </Link>
                    )}
                </div>

                {/* Continuous Scroll Wrapper */}
                {feedbacks.length > 0 && (
                    <div className="marquee-container w-full overflow-hidden flex flex-col items-center mb-16">
                        <div className="flex animate-scroll-left gap-6 pl-6 pt-4">
                            {feedbacks.map((item, i) => (
                                <FeedbackCard key={`f-${i}`} item={item} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Feedback Form Section */}
                <div className="max-w-3xl mx-auto px-6">
                    <div className="flex flex-col items-center mb-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black text-white text-center leading-tight tracking-tighter"
                        >
                            Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-400 italic">Experience</span>
                        </motion.h2>
                    </div>

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-center border border-white/10 glass-premium p-16 rounded-[3.5rem] shadow-2xl"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-gradient-to-br from-cyber-cyan to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_20px_50px_rgba(34,211,238,0.3)]"
                                >
                                    <CheckCircle2 className="text-white w-10 h-10" />
                                </motion.div>
                                <h2 className="text-3xl font-black text-white mb-4">Thank You!</h2>
                                <p className="text-white/50 text-sm mb-10 max-w-md mx-auto">
                                    Your feedback is now visible in the community string. We appreciate you!
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStatus("idle")}
                                    className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-2xl text-white text-xs font-bold uppercase tracking-widest border border-white/10 transition-all"
                                >
                                    Submit Another
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                className="relative"
                            >
                                {/* Background Decorative Glow */}
                                <div className="absolute -inset-10 bg-gradient-to-r from-cyber-cyan/10 via-transparent to-blue-500/10 blur-[100px] opacity-50" />

                                <div className="relative glass-premium p-10 md:p-14 rounded-[3.5rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden">
                                    <form onSubmit={handleSubmit} className="space-y-6">

                                        {user && (
                                            <div className="flex items-center gap-3 mb-6 bg-white/5 p-4 rounded-3xl border border-white/10">
                                                <img src={user.photoURL || ""} alt="Profile" className="w-10 h-10 rounded-full" />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-white mb-0.5">Posting as {user.displayName}</span>
                                                    <span className="text-[10px] text-cyber-cyan uppercase tracking-wider">Authenticated</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Message Input */}
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end">
                                                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Review Content</label>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${wordCount >= 200 ? 'text-red-500' : 'text-white/30'}`}>
                                                    {wordCount} / 200 Words
                                                </span>
                                            </div>

                                            <div className={`relative group transition-all duration-300 ${focused === 'message' ? 'scale-[1.01]' : ''}`}>
                                                <div className={`absolute inset-0 bg-gradient-to-r from-cyber-cyan/10 to-blue-500/10 blur-xl opacity-0 transition-opacity duration-300 ${focused === 'message' ? 'opacity-100' : ''}`} />
                                                <textarea
                                                    required
                                                    rows={5}
                                                    value={message}
                                                    onChange={handleMessageChange}
                                                    onFocus={() => setFocused('message')}
                                                    onBlur={() => setFocused(null)}
                                                    placeholder={user ? "Tell us about your experience..." : "Sign in to tell us about your experience..."}
                                                    className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] py-8 px-8 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-all shadow-inner resize-none relative z-10 leading-relaxed"
                                                />
                                                <MessageSquare className={`absolute right-8 top-8 w-5 h-5 transition-colors duration-300 ${focused === 'message' ? 'text-white/60' : 'text-white/10'}`} />
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <div className="pt-4">
                                            <motion.button
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                disabled={status === "submitting"}
                                                className="w-full relative overflow-hidden group py-5 rounded-3xl"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan to-blue-500 transition-transform duration-500 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="relative z-10 flex items-center justify-center gap-4 text-black font-black uppercase tracking-[0.4em] text-sm md:text-xs">
                                                    <span>
                                                        {!user ? "Sign In to Publish" : (status === "submitting" ? "Processing..." : "Publish Review")}
                                                    </span>
                                                    <Send className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                                </div>
                                            </motion.button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
