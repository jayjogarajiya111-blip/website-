"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Shield } from "lucide-react";

interface APIModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function APIModal({ isOpen, onClose }: APIModalProps) {
    const [apiKey, setApiKey] = useState("");
    const [copied, setCopied] = useState(false);

    const generateKey = () => {
        const key = "WXS-API-" + Math.random().toString(36).substring(2, 12).toUpperCase() + "-" + Math.random().toString(36).substring(2, 12).toUpperCase();
        setApiKey(key);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md glass rounded-[3rem] border border-white/10 p-12 overflow-hidden shadow-2xl"
                    >
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-cyber-cyan/10 flex items-center justify-center border border-cyber-cyan/30 mx-auto">
                                <Shield className="w-10 h-10 text-cyber-cyan" />
                            </div>

                            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Access <span className="text-cyber-cyan italic">Neural API</span></h2>

                            <p className="text-white/40 text-sm uppercase tracking-widest">Generate your secure developer credentials to link with Woxus core nodes.</p>

                            <div className="space-y-4">
                                {apiKey ? (
                                    <div className="relative group">
                                        <div className="bg-black/60 border border-white/5 p-4 rounded-2xl font-mono text-[10px] text-cyber-cyan break-all">
                                            {apiKey}
                                        </div>
                                        <button
                                            onClick={copyToClipboard}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-xl hover:bg-cyber-cyan hover:text-black transition-all"
                                        >
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={generateKey}
                                        className="w-full py-4 bg-cyber-cyan text-black font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                    >
                                        Generate New API Key
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={onClose}
                                className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors"
                            >
                                Close Terminal
                            </button>
                        </div>

                        {/* Decorative scanning line */}
                        <motion.div
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[1px] bg-cyber-cyan/20 blur-[1px]"
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
