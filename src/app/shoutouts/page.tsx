"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FeedbackCard, initialTestimonials } from "@/components/sections/Testimonials";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Background from "@/components/visuals/Background";
import Navbar from "@/components/layout/Navbar";

export default function ShoutoutsPage() {
    const [feedbacks, setFeedbacks] = useState(initialTestimonials);

    useEffect(() => {
        const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const liveFeedbacks = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFeedbacks(liveFeedbacks);
        });

        // Also clean up old localStorage just in case
        localStorage.removeItem('woxus_feedbacks_fresh');

        return () => unsubscribe();
    }, []);

    return (
        <main className="min-h-screen text-white relative selection:bg-cyber-cyan selection:text-black transition-colors duration-1000 overflow-x-hidden w-full bg-[#020617] pt-32 pb-24">
            <Background />
            <Navbar />

            <div className="max-w-[1400px] mx-auto flex flex-col items-center relative z-10 px-6">
                <Link href="/">
                    <button className="text-blue-500 hover:text-blue-400 font-bold text-sm tracking-wider flex items-center gap-2 mb-16 hover:underline transition-all">
                        &larr; Back to home
                    </button>
                </Link>

                <div className="text-center mb-20 space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black flex items-center justify-center gap-4"
                    >
                        <span className="text-red-500 text-3xl font-bold">&gt;</span> Shoutouts
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 text-lg tracking-wide"
                    >
                        What the community is saying about <span className="font-bold text-white">Woxus AI</span>
                    </motion.p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full">
                    {feedbacks.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                        >
                            <FeedbackCard item={item} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
