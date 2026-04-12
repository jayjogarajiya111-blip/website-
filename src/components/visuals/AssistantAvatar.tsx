"use client";

import React from "react";
import { motion } from "framer-motion";

interface AssistantAvatarProps {
    type: "woxx" | "woxie";
    isListening?: boolean;
}

interface SoundBar {
    id: number;
    height: number[];
    duration: number;
}

export default function AssistantAvatar({ type, isListening = true }: AssistantAvatarProps) {
    const [bars, setBars] = React.useState<SoundBar[]>([]);
    const isWoxx = type === "woxx";
    const avatarSrc = isWoxx ? "/woxx_avatar.png" : "/woxie_avatar.png";
    const accentColor = isWoxx ? "bg-cyber-cyan" : "bg-[#2dd4bf]";
    const statusText = isWoxx ? "WOXX - ACTIVE" : "WOXIE - LISTENING";

    React.useEffect(() => {
        const generatedBars = [...Array(12)].map((_, i) => ({
            id: i,
            height: [4, Math.random() * 20 + 4, 4],
            duration: 0.5 + Math.random() * 0.5
        }));
        setBars(generatedBars);
    }, []);

    return (
        <div className="group relative inline-flex items-center justify-center cursor-pointer">
            {/* Profil Avatar Wrapper (Always visible circle) */}
            <div className="relative p-4 glass rounded-full border border-white/10 transition-all duration-500 group-hover:scale-105 z-10 shadow-[0_0_30px_rgba(0,0,0,0.3)] group-hover:border-white/20 group-hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <div className="relative">
                    <motion.div
                        animate={isListening ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`w-20 h-20 rounded-full overflow-hidden border-2 transition-colors ${isWoxx ? "border-cyber-cyan/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]" : "border-[#2dd4bf]/50 shadow-[0_0_20px_rgba(45,212,191,0.3)]"
                            }`}
                    >
                        <img
                            src={avatarSrc}
                            alt={type}
                            className="w-full h-full object-cover relative z-10"
                        />
                    </motion.div>

                    {/* Status Indicator Dot */}
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-[2px] border-cyber-black ${accentColor} animate-pulse z-20 shadow-[0_0_10px_currentColor]`} />
                </div>
            </div>

            {/* Hover Dialogue Box (Tooltip) */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-max min-w-[240px] p-6 glass rounded-2xl border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-6 group-hover:translate-y-0 z-50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">

                {/* Content */}
                <div className="space-y-6 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center">
                        <span className={`text-[13px] font-black tracking-[0.35em] uppercase ${isWoxx ? "text-cyber-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "text-[#2dd4bf] drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]"}`}>
                            {statusText}
                        </span>
                    </div>

                    {/* Dynamic Sound Wave */}
                    <div className="flex items-end justify-center gap-1.5 h-8">
                        {bars.map((bar, i) => (
                            <motion.div
                                key={bar.id}
                                animate={{
                                    height: isListening ? bar.height : 4
                                }}
                                transition={{
                                    duration: bar.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.05
                                }}
                                className={`w-1.5 rounded-full ${accentColor} opacity-90 shadow-[0_0_8px_currentColor]`}
                            />
                        ))}
                    </div>
                </div>

                {/* Triangle Pointer */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 glass border-b border-r border-white/10 transform rotate-45 z-[-1]"></div>
            </div>
        </div>
    );
}
