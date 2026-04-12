"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Zap,
    Layers,
    Box,
    Brain,
    Monitor,
    Smartphone,
    Briefcase,
    TrendingUp,
    MessageSquare,
    Shield,
    Activity,
    AlertCircle,
    Crosshair,
    Terminal,
    Map
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

const sidebarLinks = [
    { name: "INTRODUCTION", href: "#introduction" },
    { name: "CORE PHILOSOPHY", href: "#philosophy" },
    { name: "ARCHITECTURE", href: "#architecture" },
    { name: "SENSORY PERCEPTION", href: "#perception" },
    { name: "MODULES", href: "#modules" },
    { name: "SECURITY", href: "#security" },
    { name: "TECH STACK", href: "#tech-stack" },
    { name: "CONCLUSION", href: "#conclusion" },
];

export default function DocumentationPage() {
    const [activeSection, setActiveSection] = useState("introduction");

    useEffect(() => {
        const handleScroll = () => {
            const sections = sidebarLinks.map(link => link.href.substring(1));
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#070b14] text-gray-300 font-sans selection:bg-cyber-cyan selection:text-black pt-20">
            <Navbar />
            {/* Sidebar */}
            <aside className="fixed left-0 top-20 w-64 h-[calc(100vh-5rem)] border-r border-[#1a2235] bg-[#0a0f1c]/80 backdrop-blur-xl z-10 overflow-y-auto hidden md:block">
                <div className="p-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/40 hover:text-cyber-cyan transition-colors text-xs font-bold uppercase tracking-wider mb-8 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                        Back to Home
                    </Link>
                    <h2 className="text-xl font-bold text-cyber-cyan mb-8 tracking-wider">WOXUS V1<br /><span className="text-xs text-gray-500 font-normal">DOCUMENTATION</span></h2>
                    <nav className="space-y-2">
                        {sidebarLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-l-2 ${activeSection === link.href.substring(1)
                                    ? "border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                                    : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full ${activeSection === link.href.substring(1) ? 'bg-cyber-cyan shadow-[0_0_5px_#22d3ee]' : 'bg-transparent'}`} />
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 p-8 md:p-12 lg:p-20 max-w-5xl">

                {/* Hero Section */}
                <section className="mb-24 pt-10">
                    <div className="inline-block px-3 py-1 mb-6 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan text-xs font-semibold tracking-wider neon-glow">
                        ✦ REALTIME EXPERIENCE & EXECUTION
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                        WOXUS V1 <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-500">
                            Documentation
                        </span>
                    </h1>
                    <p className="text-base md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
                        The definitive guide to a multimodal AI ecosystem. An assistant that sees, hears, and executes real-world tasks in real time.
                    </p>
                </section>

                <hr className="border-[#1a2235] mb-20" />

                {/* Introduction */}
                <section id="introduction" className="mb-24 scroll-mt-28">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">The Evolution of Human-AI Interaction</h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-gray-400 mb-4 leading-relaxed">
                                In the rapidly shifting landscape of artificial intelligence, we have reached a critical inflection point. For years, our interaction with AI has been confined to the "box"—a chat interface where text goes in and text comes out. While these Large Language Models (LLMs) are undeniably powerful, they have remained passive observers.
                            </p>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                WOXUS V1 was born from a singular, ambitious vision: to shatter the walls of the chat box and create a truly autonomous digital extension of the human experience. It is designed to live alongside the user, seeing what they see, hearing what they hear, and executing complex workflows.
                            </p>
                            <div className="p-6 border border-cyber-cyan/30 bg-cyber-cyan/5 rounded-xl neon-border relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-cyber-cyan"></div>
                                <p className="text-cyber-cyan font-medium italic">
                                    "WOXUS is not just an assistant. It is a Multimodal AI Agent Operating System designed for high-agency execution."
                                </p>
                            </div>
                        </div>
                        <div className="h-64 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-[#1e293b] flex items-center justify-center p-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyber-cyan/20 blur-3xl rounded-full"></div>
                            <Brain className="w-24 h-24 text-cyber-cyan/50 group-hover:text-cyber-cyan transition-colors duration-500 relative z-10" />
                        </div>
                    </div>
                </section>

                {/* Core Philosophy */}
                <section id="philosophy" className="mb-24 scroll-mt-28 flex flex-col items-center">
                    <h4 className="text-cyber-cyan text-sm font-bold tracking-widest uppercase mb-2">The Foundation</h4>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">Core Philosophy</h2>

                    <div className="grid md:grid-cols-3 gap-6 w-full">
                        <div className="glass p-8 rounded-2xl border border-[#1e293b] hover:border-cyber-cyan/50 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-cyber-cyan/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6 text-cyber-cyan" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Immediacy</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Intelligence is useless if it is slow. WOXUS optimizes for sub-300ms latency, enabling natural, "barge-in" conversations that mimic human interaction.</p>
                        </div>

                        <div className="glass p-8 rounded-2xl border border-[#1e293b] hover:border-cyber-cyan/50 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Layers className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Multimodality</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">The world is not just text. To be a true assistant, an AI must understand visual context (screens, cameras) and auditory nuances (voice, environment).</p>
                        </div>

                        <div className="glass p-8 rounded-2xl border border-[#1e293b] hover:border-cyber-cyan/50 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Box className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Agency</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">An assistant must be able to do, not just say. WOXUS has deep hooks into the OS, browsers, office suites, and hardware to turn intent into action instantly.</p>
                        </div>
                    </div>
                </section>

                {/* Architecture */}
                <section id="architecture" className="mb-24 scroll-mt-28">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">System Architecture</h2>
                    <p className="text-gray-400 mb-12 max-w-3xl">A conceptual design modeled after the human nervous system. It orchestrates intelligence and execution seamlessly.</p>

                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* The Body */}
                            <div className="glass p-8 rounded-2xl border border-[#1e293b] relative overflow-hidden">
                                <div className="absolute right-0 top-0 w-48 h-48 bg-cyber-cyan/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#131b2f] border border-[#232f4e] flex items-center justify-center">
                                        <Monitor className="w-6 h-6 text-cyber-cyan" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">The Body</h3>
                                </div>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">The primary interface and visual feedback mechanism. Features a cutting-edge Holographic Glass design and custom WebGL-powered audio visualizers.</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between border-b border-[#1e293b] pb-2">
                                        <span className="text-gray-500">Framework</span>
                                        <span className="text-gray-300 font-medium">React</span>
                                    </div>
                                    <div className="flex justify-between border-b border-[#1e293b] pb-2 pt-2">
                                        <span className="text-gray-500">Desktop</span>
                                        <span className="text-gray-300 font-medium">Electron</span>
                                    </div>
                                    <div className="flex justify-between pt-2">
                                        <span className="text-gray-500">Styling</span>
                                        <span className="text-gray-300 font-medium">TailwindCSS</span>
                                    </div>
                                </div>
                            </div>

                            {/* The Limb */}
                            <div className="glass p-8 rounded-2xl border border-[#1e293b] relative overflow-hidden">
                                <div className="absolute right-0 top-0 w-48 h-48 bg-blue-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#131b2f] border border-[#232f4e] flex items-center justify-center">
                                        <Smartphone className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">The Limb</h3>
                                </div>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">The hardware bridge that connects the digital brain to the physical world via mobile sensors and camera arrays.</p>
                                <ul className="space-y-3 text-sm text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_5px_#60a5fa]"></div>
                                        Flutter Companion App
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_5px_#60a5fa]"></div>
                                        Telepresence Video/Audio Bridge
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_5px_#60a5fa]"></div>
                                        Live Sensor Telemetry Stream
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sensory Perception */}
                <section id="perception" className="mb-24 scroll-mt-28">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-cyber-cyan pl-4">Sensory Perception</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass p-6 rounded-2xl border border-[#1e293b] hover:border-gray-600 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-[#131b2f] flex items-center justify-center text-cyber-cyan">
                                    <Monitor strokeWidth={1.5} />
                                </div>
                                <h3 className="font-bold text-white text-lg">Screen Vision</h3>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Real-time screen OCR and element detection. Debugs code as you write, reads PDFs with you, and analyzes web interfaces instantly using MSS and OpenCV.
                            </p>
                        </div>

                        <div className="glass p-6 rounded-2xl border border-[#1e293b] hover:border-gray-600 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-[#131b2f] flex items-center justify-center text-blue-400">
                                    <Monitor strokeWidth={1.5} />
                                </div>
                                <h3 className="font-bold text-white text-lg">Laptop Camera Vision</h3>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Extended Object Identification. Streams your laptop's camera to the Brain, identifies physical hardware parts, and assists in real-world environments.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Execution Modules */}
                <section id="modules" className="mb-24 scroll-mt-28">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Execution Modules</h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-6 rounded-xl border border-[#1e293b] bg-gradient-to-b from-[#0f172a] to-transparent hover:border-cyber-cyan/50 transition-colors relative group">
                            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent to-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-xl rounded-tl-xl" />
                            <Briefcase className="w-6 h-6 text-cyber-cyan mb-4" />
                            <h4 className="font-bold text-white mb-2">Office Automation</h4>
                            <p className="text-xs text-gray-400">Autonomous Word & Excel generation. Web scraping via Playwright.</p>
                        </div>

                        <div className="p-6 rounded-xl border border-[#1e293b] bg-gradient-to-b from-[#0f172a] to-transparent hover:border-blue-500/50 transition-colors relative group">
                            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-xl rounded-tl-xl" />
                            <TrendingUp className="w-6 h-6 text-blue-400 mb-4" />
                            <h4 className="font-bold text-white mb-2">Market Intelligence</h4>
                            <p className="text-xs text-gray-400">Real-time technical analysis, price forecasts, and sector screening.</p>
                        </div>

                        <div className="p-6 rounded-xl border border-[#1e293b] bg-gradient-to-b from-[#0f172a] to-transparent hover:border-green-500/50 transition-colors relative group">
                            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent to-green-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-xl rounded-tl-xl" />
                            <MessageSquare className="w-6 h-6 text-green-400 mb-4" />
                            <h4 className="font-bold text-white mb-2">WhatsApp Integration</h4>
                            <p className="text-xs text-gray-400">Voice-driven messaging, file beaming, and call management.</p>
                        </div>
                    </div>
                </section>

                {/* Security */}
                <section id="security" className="mb-24 scroll-mt-28">
                    <div className="bg-[#0f1322] border border-[#1e293b] rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        {/* Background accents */}
                        <div className="absolute right-0 top-0 w-64 h-full bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-10 mix-blend-overlay"></div>
                        <div className="absolute right-0 bottom-0 w-96 h-96 bg-red-500/5 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2"></div>

                        <div className="grid md:grid-cols-5 gap-12 items-center relative z-10">
                            <div className="md:col-span-2">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/5 border border-red-500/30 flex items-center justify-center mb-6">
                                    <Shield className="w-8 h-8 text-red-400" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Fortified Security</h2>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    Privacy by design. Every agent action is audited and filtered through our neural firewall. The Cyber-WOXUS module ensures ethical hacking assistance and personal system security.
                                </p>
                            </div>

                            <div className="md:col-span-3 grid grid-cols-2 gap-4">
                                <div className="bg-[#0a0f1c] p-5 rounded-xl border border-[#1e293b]">
                                    <Activity className="w-5 h-5 text-red-400 mb-3" />
                                    <h4 className="font-bold text-white text-sm mb-1">Network Monitoring</h4>
                                    <p className="text-xs text-gray-500">Real-time analysis, Nmap & Sublist3r mapping.</p>
                                </div>
                                <div className="bg-[#0a0f1c] p-5 rounded-xl border border-[#1e293b]">
                                    <Crosshair className="w-5 h-5 text-orange-400 mb-3" />
                                    <h4 className="font-bold text-white text-sm mb-1">Vulnerability Detection</h4>
                                    <p className="text-xs text-gray-500">Autonomous identification of potential security flaws.</p>
                                </div>
                                <div className="bg-[#0a0f1c] p-5 rounded-xl border border-[#1e293b]">
                                    <Terminal className="w-5 h-5 text-yellow-400 mb-3" />
                                    <h4 className="font-bold text-white text-sm mb-1">Exploit Advice</h4>
                                    <p className="text-xs text-gray-500">Context-aware guidance for safe payload generation.</p>
                                </div>
                                <div className="bg-[#0a0f1c] p-5 rounded-xl border border-[#1e293b]">
                                    <Map className="w-5 h-5 text-green-400 mb-3" />
                                    <h4 className="font-bold text-white text-sm mb-1">Local Security</h4>
                                    <p className="text-xs text-gray-500">Recommendation on open ports and system hardening.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section id="tech-stack" className="mb-24 scroll-mt-28 flex flex-col items-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">The Tech Stack</h2>
                    <p className="text-gray-400 text-sm mb-12">The foundational layers of our architecture</p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { name: "PYTHON", icon: "🐍" },
                            { name: "ELECTRON", icon: "⚛️" },
                            { name: "REACT", icon: "🌐" },
                            { name: "VITE", icon: "⚡" },
                            { name: "WEBSOCKETS", icon: "🔌" },
                            { name: "ChromaDB", icon: "🗄️" }
                        ].map((tech) => (
                            <div key={tech.name} className="flex flex-col items-center justify-center w-24 h-24 bg-[#0d1323] border border-[#1e293b] rounded-xl hover:border-cyber-cyan/50 hover:bg-[#131b2f] transition-all group cursor-default">
                                <span className="text-2xl mb-2 grayscale group-hover:grayscale-0 transition-all">{tech.icon}</span>
                                <span className="text-[10px] font-bold text-gray-500 tracking-wider group-hover:text-cyber-cyan transition-colors">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="border-[#1a2235] mb-20" />

                {/* Conclusion */}
                <section id="conclusion" className="mb-24 scroll-mt-28 flex flex-col items-center text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Future Vision</h2>
                    <p className="text-gray-400 max-w-2xl text-lg leading-relaxed mb-8">
                        WOXUS V1 is the first step toward a future where computing is not a tool we use, but a partner we collaborate with. We are moving toward total environmental autonomy and zero-friction task planning. By integrating vision, voice, OS automation, and mobile synergy into a single ecosystem, WOXUS is your ultimate AI agent.
                    </p>

                </section>

            </main>
        </div>
    );
}
