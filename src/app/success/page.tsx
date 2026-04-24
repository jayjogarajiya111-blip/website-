"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle, Copy, Check, ArrowRight, Download,
    Shield, Zap, Terminal, RefreshCcw, ExternalLink
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Background from "@/components/visuals/Background";

interface SubscriptionData {
    success: boolean;
    plan: string;
    currentToken: string;
    endDate: any;
    isActive: boolean;
}

export default function SuccessPage() {
    const [loading, setLoading] = useState(true);
    const [subData, setSubData] = useState<SubscriptionData | null>(null);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                // Fetching from the Express backend on port 5000
                const res = await fetch('http://localhost:5000/api/subscription/my-token');
                const data = await res.json();
                if (data.success) {
                    setSubData(data);
                } else {
                    setError("Could not find your latest token. Please check again in a moment.");
                }
            } catch (err) {
                setError("Failed to reach the server. Please try refreshing.");
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, []);

    const copyToClipboard = () => {
        if (subData?.currentToken) {
            navigator.clipboard.writeText(subData.currentToken);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-[#070b14] text-gray-300 font-sans selection:bg-cyber-cyan selection:text-black overflow-hidden">
            <Background />
            <Navbar />

            <main className="relative z-10 pt-32 pb-24 px-6 flex flex-col items-center justify-center min-h-[90vh]">

                {/* Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-cyan/10 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-xl w-full text-center"
                >
                    {/* Header Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-cyber-cyan blur-2xl opacity-20 animate-pulse" />
                            <CheckCircle className="w-20 h-20 text-cyber-cyan relative z-10" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        PAYMENT{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-500">
                            SUCCESSFUL
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                        Thank you for your purchase! Your Woxus Activation Token has been generated and is ready for use.
                    </p>

                    {/* Token Card */}
                    <div className="glass rounded-3xl border border-white/10 p-1 relative overflow-hidden group mb-10 transition-all hover:border-cyber-cyan/30">
                        <div className="bg-black/40 rounded-[22px] p-8">
                            {loading ? (
                                <div className="flex flex-col items-center py-6">
                                    <RefreshCcw className="w-8 h-8 text-cyber-cyan animate-spin mb-4" />
                                    <p className="text-xs font-mono uppercase tracking-widest text-white/40">Fetching Your Token...</p>
                                </div>
                            ) : error ? (
                                <div className="py-6">
                                    <p className="text-red-400 text-sm font-medium">{error}</p>
                                    <button onClick={() => window.location.reload()} className="mt-4 text-xs font-bold text-cyber-cyan hover:underline uppercase tracking-wider">Try Again</button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase italic">
                                            ACTIVE PLAN: <span className="text-cyber-cyan">{subData?.plan?.toUpperCase()}</span>
                                        </span>
                                        <div className="h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                                    </div>

                                    <div className="relative group/token">
                                        <div className="text-3xl md:text-4xl font-mono font-black text-white tracking-widest break-all">
                                            {subData?.currentToken}
                                        </div>

                                        <button
                                            onClick={copyToClipboard}
                                            className="mt-6 w-full flex items-center justify-center gap-2 py-4 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-2xl text-cyber-cyan font-black text-sm uppercase tracking-widest transition-all hover:bg-cyber-cyan hover:text-black group-hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            {copied ? (
                                                <><Check className="w-4 h-4" /> COPIED TO CLIPBOARD</>
                                            ) : (
                                                <><Copy className="w-4 h-4" /> COPY TOKEN</>
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-12">
                        <div className="glass p-5 rounded-2xl border border-white/5 flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-400 font-bold text-xs">1</div>
                            <div>
                                <h4 className="text-white font-bold text-xs mb-1 uppercase tracking-wider">Open Woxus EXE</h4>
                                <p className="text-[11px] text-gray-500 leading-relaxed">Launch the Woxus application on your desktop.</p>
                            </div>
                        </div>
                        <div className="glass p-5 rounded-2xl border border-white/5 flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center flex-shrink-0 text-purple-400 font-bold text-xs">2</div>
                            <div>
                                <h4 className="text-white font-bold text-xs mb-1 uppercase tracking-wider">Paste & Activate</h4>
                                <p className="text-[11px] text-gray-500 leading-relaxed">Paste your token into the setup screen to unlock.</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/setup"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-cyber-cyan active:scale-95"
                        >
                            <Terminal className="w-4 h-4" /> Setup Instructions
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white/70 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-white/10 active:scale-95"
                        >
                            Back to Home <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <p className="mt-12 text-[10px] text-gray-600 uppercase tracking-widest">
                        A copy of this token has also been saved to your profile.
                    </p>
                </motion.div>
            </main>
        </div>
    );
}
