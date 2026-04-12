"use client";

import React from "react";
import { motion } from "framer-motion";

interface SaturnNode {
    id: number;
    x: number[];
    y: number[];
    duration: number;
    left: string;
    top: string;
    hex: string;
}

export default function SaturnVisual() {
    const [nodes, setNodes] = React.useState<SaturnNode[]>([]);

    React.useEffect(() => {
        const generatedNodes = [...Array(8)].map((_, i) => ({
            id: i,
            x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
            y: [Math.random() * 100 - 50, Math.random() * -100 - 50],
            duration: 3 + Math.random() * 7,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            hex: `0x${Math.random().toString(16).slice(2, 6).toUpperCase()}_SYNC`
        }));
        setNodes(generatedNodes);
    }, []);

    return (
        <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
            {/* Outer Orbiting Rings / Data Spheres */}
            <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            rotate: 360,
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            rotate: { duration: 15 + i * 5, repeat: Infinity, ease: "linear" },
                            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute inset-0 border border-cyber-cyan/10 rounded-full"
                        style={{ margin: `${i * 10}%` }}
                    />
                ))}
            </div>

            {/* Saturn Body */}
            <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-cyber-black via-cyber-cyan/20 to-cyber-black border border-cyber-cyan/30 shadow-[0_0_50px_rgba(34,211,238,0.2)] flex items-center justify-center overflow-hidden">
                {/* Internal Core Glow */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [0.8, 1.1, 0.8],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-3/4 h-3/4 rounded-full bg-cyber-cyan/10 blur-3xl text-cyber-cyan/50"
                    style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
                />

                {/* Data Grid Overlay on Planet */}
                <div className="absolute inset-0 military-grid opacity-20 rotate-45" />

                {/* Central Core */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-cyber-cyan/40 blur-sm animate-pulse" />
            </div>

            {/* Saturn's Technical Rings */}
            <div className="absolute z-20 w-[150%] h-[40%] border-4 border-cyber-cyan/20 rounded-[100%] rotate-[-20deg] flex items-center justify-center">
                <div className="w-[95%] h-[90%] border-2 border-cyber-cyan/10 rounded-[100%]" />

                {/* Orbiting Data Points on Rings */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            offsetDistance: ["0%", "100%"]
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute w-1 h-1 bg-cyber-cyan shadow-[0_0_8px_white]"
                        style={{
                            offsetPath: "border-box", // Approximation, works better with SVG but we'll use motion.div on a border
                            left: `${15 + i * 15}%`,
                            top: `${50}%`
                        }}
                    />
                ))}

                {/* Static Tech Accents on Rings */}
                <div className="absolute top-0 left-1/4 w-px h-8 bg-cyber-cyan/50 shadow-glow" />
                <div className="absolute bottom-0 right-1/4 w-px h-8 bg-cyber-cyan/50 shadow-glow" />
            </div>

            {/* Floating UI Elements / Floating Nodes */}
            {nodes.map((node, i) => (
                <motion.div
                    key={node.id}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        y: node.y,
                        x: node.x,
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: node.duration,
                        repeat: Infinity,
                        delay: i * 0.2
                    }}
                    className="absolute z-30"
                    style={{
                        left: node.left,
                        top: node.top,
                    }}
                >
                    <div className={`w-1 h-1 rounded-full ${i % 2 === 0 ? "bg-cyber-cyan" : "bg-white"} shadow-[0_0_10px_rgba(34,211,238,0.8)]`} />
                    {i % 4 === 0 && (
                        <div className="text-[6px] font-mono text-cyber-cyan/30 mt-1 whitespace-nowrap">
                            {node.hex}
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}

