"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DISTRICT_PATHS } from "./MapData";

const DISTRICT_NAMES: { [key: string]: string } = {
    AHM: "Ahmedabad",
    AMR: "Amreli",
    ANA: "Anand",
    ARA: "Aravalli",
    BAN: "Banaskantha",
    BHA: "Bharuch",
    BHAV: "Bhavnagar",
    BOT: "Botad",
    CHU: "Chhota Udaipur",
    DAH: "Dahod",
    DAN: "Dang",
    DED: "Devbhumi Dwarka",
    GAN: "Gandhinagar",
    GIR: "Gir Somnath",
    JAM: "Jamnagar",
    JUN: "Junagadh",
    KHE: "Kheda",
    KUT: "Kutch",
    MAH: "Mahisagar",
    MEH: "Mehsana",
    MOR: "Morbi",
    NAR: "Narmada",
    NAV: "Navsari",
    PAN: "Panchmahal",
    PAT: "Patan",
    POR: "Porbandar",
    RAJ: "Rajkot",
    SAB: "Sabarkantha",
    SUR: "Surat",
    SURA: "Surendranagar",
    TAP: "Tapi",
    VAL: "Valsad",
    VAD: "Vadodara"
};

const MAJOR_HUBS = [
    { key: "AHM", x: 713, y: 391, name: "Ahmedabad Hub" },
    { key: "SUR", x: 673, y: 575, name: "Surat Hub" },
    { key: "RAJ", x: 547, y: 473, name: "Rajkot Hub" },
    { key: "KUT", x: 348, y: 215, name: "Kutch Hub" },
    { key: "GA", x: 781, y: 339, name: "Gandhinagar Hub" }
];

export default function GujaratMap() {
    const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

    return (
        <div className="relative w-full max-w-4xl aspect-[1.1/1] flex items-center justify-center p-4">
            <svg
                viewBox="100 0 900 700"
                className="w-full h-full drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="mapGlow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="distGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(0, 255, 255, 0.05)" />
                        <stop offset="100%" stopColor="rgba(0, 255, 255, 0.02)" />
                    </linearGradient>
                </defs>

                {/* Back-glow for the entire map */}
                <motion.path
                    d={Object.values(DISTRICT_PATHS).join(" ")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    className="fill-cyan-500 blur-2xl pointer-events-none"
                />

                {/* Individual Districts */}
                {Object.entries(DISTRICT_PATHS).map(([key, path]) => (
                    <motion.path
                        key={key}
                        d={path}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{
                            opacity: hoveredDistrict && hoveredDistrict !== key ? 0.4 : 1,
                            scale: 1,
                            stroke: hoveredDistrict === key ? "#00FFFF" : "rgba(0, 255, 255, 0.15)",
                            strokeWidth: hoveredDistrict === key ? 2 : 0.8,
                            fill: hoveredDistrict === key ? "rgba(34, 211, 238, 0.15)" : "rgba(0, 0, 0, 0.4)"
                        }}
                        whileHover={{
                            fill: "rgba(34, 211, 238, 0.25)",
                            transition: { duration: 0.2 }
                        }}
                        onMouseEnter={() => setHoveredDistrict(key)}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        className="cursor-pointer transition-all"
                        style={{ filter: hoveredDistrict === key ? "url(#mapGlow)" : "none" }}
                    />
                ))}

                {/* Inter-hub Neural Lines */}
                {MAJOR_HUBS.map((hub, i) =>
                    MAJOR_HUBS.slice(i + 1).map((target, j) => (
                        <motion.line
                            key={`line-${i}-${j}`}
                            x1={hub.x} y1={hub.y}
                            x2={target.x} y2={target.y}
                            stroke="#00FFFF"
                            strokeWidth="0.5"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.1 }}
                            transition={{ duration: 2.5, delay: i * 0.2 }}
                        />
                    ))
                )}

                {/* Hub Pulsing Points */}
                {MAJOR_HUBS.map((hub, i) => (
                    <g key={`hub-${i}`} className="pointer-events-none">
                        <circle
                            cx={hub.x} cy={hub.y} r="2"
                            fill="#00FFFF"
                            className="opacity-50"
                        />
                        <motion.circle
                            cx={hub.x} cy={hub.y} r="6"
                            stroke="#00FFFF"
                            strokeWidth="0.5"
                            animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                        />
                    </g>
                ))}
            </svg>

            {/* Floating Detail Panel */}
            <AnimatePresence>
                {hoveredDistrict && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-8 px-6 py-3 bg-cyber-black/90 border border-cyan-500/30 rounded-lg backdrop-blur-xl z-20 shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                                <span className="text-cyan-400 font-mono text-xs">{hoveredDistrict}</span>
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-sm tracking-wide">
                                    {DISTRICT_NAMES[hoveredDistrict] || hoveredDistrict}
                                </h4>
                                <p className="text-cyan-400/60 text-[10px] uppercase font-mono tracking-tighter">
                                    Adaptive Node Active
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
