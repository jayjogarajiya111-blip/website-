"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Mic, Shield } from "lucide-react";

export type AssistantType = "woxx" | "woxie";

interface AssistantSettingsProps {
    selectedAssistant: AssistantType;
    onSelect: (type: AssistantType) => void;
}

const assistants = [
    {
        id: "woxx" as AssistantType,
        name: "Woxx (Male Voice)",
        description: "Choose Woxx for a sharp, professional, and logical interaction. His sleek interface is designed for high-efficiency tasks and quick responses.",
        avatar: "/woxx_avatar.png",
        accent: "text-cyber-cyan",
        border: "border-cyber-cyan/30",
        bg: "bg-cyber-cyan/10",
    },
    {
        id: "woxie" as AssistantType,
        name: "Woxie (Female Voice)",
        description: "Choose Woxie for a friendly, intuitive, and warm experience. Her interface is optimized for helpful guidance and a welcoming atmosphere.",
        avatar: "/woxie_avatar.png",
        accent: "text-[#2dd4bf]",
        border: "border-[#2dd4bf]/30",
        bg: "bg-[#2dd4bf]/10",
    },
];

export default function AssistantSettings({ selectedAssistant, onSelect }: AssistantSettingsProps) {
    return (
        <section className="py-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
                    >
                        Select Your Assistant <span className="text-cyber-cyan italic">Personality</span>
                    </motion.h2>
                    <p className="text-white/40 text-sm md:text-base uppercase tracking-[0.3em]">
                        Choose the voice and interface that fits your workflow.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {assistants.map((assistant) => (
                        <motion.div
                            key={assistant.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => onSelect(assistant.id)}
                            className={`relative cursor-pointer glass rounded-3xl border ${selectedAssistant === assistant.id
                                    ? `${assistant.border} ring-1 ring-white/20`
                                    : "border-white/5"
                                } p-8 group transition-all`}
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                                {/* Avatar */}
                                <div className="relative">
                                    <div className={`w-32 h-32 rounded-full overflow-hidden border-2 transition-colors ${selectedAssistant === assistant.id ? assistant.border : "border-white/10"
                                        }`}>
                                        <img
                                            src={assistant.avatar}
                                            alt={assistant.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {selectedAssistant === assistant.id && (
                                        <motion.div
                                            layoutId="check-icon"
                                            className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center border border-white/20 shadow-lg ${assistant.bg}`}
                                        >
                                            <Check className={`w-6 h-6 ${assistant.accent}`} />
                                        </motion.div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-center md:justify-start gap-3">
                                        <h3 className={`text-2xl font-bold uppercase tracking-tight ${selectedAssistant === assistant.id ? assistant.accent : "text-white"
                                            }`}>
                                            {assistant.name}
                                        </h3>
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedAssistant === assistant.id ? `${assistant.bg} ${assistant.accent}` : "bg-white/5 text-white/30"
                                            }`}>
                                            {assistant.id === "woxx" ? "Professional" : "Intuitive"}
                                        </div>
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        {assistant.description}
                                    </p>

                                    <div className="pt-4 flex items-center justify-center md:justify-start gap-4">
                                        <div className="flex items-center gap-2">
                                            <Mic className={`w-4 h-4 ${assistant.id === selectedAssistant ? assistant.accent : "text-white/20"}`} />
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Voice Enabled</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Shield className={`w-4 h-4 ${assistant.id === selectedAssistant ? assistant.accent : "text-white/20"}`} />
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Secure Sync</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Selection Ripple */}
                            {selectedAssistant === assistant.id && (
                                <motion.div
                                    layoutId="selection-border"
                                    className={`absolute inset-0 rounded-3xl border-2 pointer-events-none ${assistant.border}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.5em] font-bold italic">
                        Tip: You can easily switch between Woxx and Woxie in the "Voice Settings" menu to instantly change Woxus’s voice.
                    </p>
                </div>
            </div>
        </section>
    );
}
