"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mic, Zap, MessageSquare, Globe, Shield, UserCheck } from "lucide-react";

const features = [
    {
        title: "Voice Control",
        desc: "Neural-link voice synthesis for seamless hands-free operation across the mesh.",
        icon: Mic,
        color: "text-cyber-cyan",
        border: "border-cyber-cyan/30"
    },
    {
        title: "Automation",
        desc: "Automated heuristic protocols that optimize your environment in real-time.",
        icon: Zap,
        color: "text-amber-400",
        border: "border-amber-400/30"
    },
    {
        title: "Smart Chat",
        desc: "Context-aware conversational AI with advanced emotional intelligence nodes.",
        icon: MessageSquare,
        color: "text-blue-400",
        border: "border-blue-400/30"
    },
    {
        title: "Cross Platform",
        desc: "Synchronize your neural profile across all connected orbital and ground devices.",
        icon: Globe,
        color: "text-purple-400",
        border: "border-purple-400/30"
    },
    {
        title: "Secure",
        desc: "Military-grade quantum encryption protecting every data-packet in transit.",
        icon: Shield,
        color: "text-emerald-400",
        border: "border-emerald-400/30"
    },
    {
        title: "Personal Assistant",
        desc: "A dedicated digital twin that learns your preferences and anticipates needs.",
        icon: UserCheck,
        color: "text-rose-400",
        border: "border-rose-400/30"
    }
];

export default function FeaturesSection() {
    return (
        <section className="py-24 px-6 relative" id="features">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-16 text-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-cyber-cyan text-xs font-black uppercase tracking-[0.5em] mb-4"
                    >
                        Core Capabilities
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter"
                    >
                        Integrated <span className="text-cyber-cyan italic text-stroke">Features</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`glass p-8 rounded-[2.5rem] border ${feature.border} group transition-all duration-500 hover:bg-white/5`}
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon className={`w-7 h-7 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest font-medium">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
