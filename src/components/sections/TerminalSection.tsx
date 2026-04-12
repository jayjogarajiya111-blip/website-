"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const commands = [
    "Open Chrome",
    "Play Music",
    "Shutdown System",
    "Open VS Code",
    "Check Weather",
];

export default function TerminalSection() {
    const [currentLine, setCurrentLine] = useState("");
    const [commandIndex, setCommandIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        if (commandIndex >= commands.length) {
            setCommandIndex(0);
            return;
        }

        const command = commands[commandIndex];

        if (charIndex < command.length) {
            const timeout = setTimeout(() => {
                setCurrentLine((prev) => prev + command[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setHistory((prev) => [...prev, command]);
                setCurrentLine("");
                setCharIndex(0);
                setCommandIndex((prev) => prev + 1);
                if (history.length > 5) setHistory(prev => prev.slice(1));
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, commandIndex]);

    return (
        <section className="py-24 px-6 relative bg-black/40">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                        AI <span className="text-cyber-cyan italic">Command Terminal</span>
                    </h2>
                </div>

                <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="bg-white/5 p-3 flex items-center gap-2 border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        <span className="text-[10px] font-mono text-white/30 ml-2">woxus@kernel_prompt</span>
                    </div>

                    <div className="p-8 font-mono text-sm h-[300px] flex flex-col justify-end bg-black/60">
                        <div className="space-y-2 opacity-60">
                            {history.map((cmd, i) => (
                                <div key={i} className="flex gap-3">
                                    <span className="text-cyber-cyan">❯</span>
                                    <span className="text-white">{cmd}</span>
                                    <span className="text-white/40">... [EXEC_SUCCESS]</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-4">
                            <span className="text-cyber-cyan">❯</span>
                            <span className="text-white">{currentLine}</span>
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-5 bg-cyber-cyan"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
