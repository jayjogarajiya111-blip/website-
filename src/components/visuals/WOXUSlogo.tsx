"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WoxusLogo() {
    return (
        <div className="relative flex flex-col items-center justify-center">
            {/* WOXUS TEXT */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center"
            >
                <div className="relative group">
                    <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white uppercase flex items-baseline drop-shadow-[0_0_30px_rgba(34,211,238,0.6)] select-none">
                        WOX<span className="text-cyber-cyan italic animate-glitch relative">US</span>
                    </h1>

                    {/* Subtle Cyber Details around text */}
                    <div className="absolute -top-4 -left-4 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Technical Sub-line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1 }}
                    className="text-[10px] uppercase font-mono tracking-[1em] text-cyan-400 mt-4 select-none"
                >
                    Woxus V.01
                </motion.div>

                {/* Animated Flow Underline */}
                <div className="w-full h-[2px] bg-white/10 mt-2 relative overflow-hidden rounded-full">
                    <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent w-full"
                    />
                </div>
            </motion.div>

            {/* Internal Circuit Tracing Animation (Background layer) */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none overflow-visible">
                <svg viewBox="0 0 500 200" className="w-[150%] h-auto preserve-3d">
                    {/* Circuit Line 1 */}
                    <motion.path
                        d="M 20 100 L 150 100 L 180 40 L 320 40 L 350 100 L 480 100"
                        fill="none"
                        stroke="#00FFFF"
                        strokeWidth="0.8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Circuit Line 2 */}
                    <motion.path
                        d="M 50 130 L 180 130 L 210 180 L 290 180 L 320 130 L 450 130"
                        fill="none"
                        stroke="#00FFFF"
                        strokeWidth="0.8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                    />

                    {/* Moving Data Packets */}
                    <motion.circle r="2" fill="#00FFFF" filter="url(#glow)">
                        <animateMotion
                            dur="5s"
                            repeatCount="indefinite"
                            path="M 20 100 L 150 100 L 180 40 L 320 40 L 350 100 L 480 100"
                        />
                    </motion.circle>
                    <motion.circle r="2" fill="#00FFFF" filter="url(#glow)">
                        <animateMotion
                            dur="4s"
                            repeatCount="indefinite"
                            begin="1s"
                            path="M 50 130 L 180 130 L 210 180 L 290 180 L 320 130 L 450 130"
                        />
                    </motion.circle>
                </svg>
            </div>

            {/* Radiant Aura Glow */}
            <div className="absolute -inset-20 bg-cyber-cyan/5 blur-[80px] rounded-full animate-pulse-slow pointer-events-none select-none" />
        </div>
    );
}
