"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Background from "@/components/visuals/Background";
import Link from "next/link";
import { Shield, Book, Terminal, ChevronRight, Activity, Database, Lock, Globe } from "lucide-react";

export default function LegalPage() {
    const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'api'>('terms');

    const renderTerms = () => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8 text-white/80"
        >
            <div>
                <h2 className="text-3xl font-black text-white mb-2">Terms and Conditions</h2>
                <p className="text-cyber-cyan text-sm font-bold tracking-widest uppercase">Effective Date: April 2026</p>
            </div>

            <div className="space-y-6">
                <section>
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-cyber-cyan" /> 1. Acceptance of Terms
                    </h3>
                    <p className="leading-relaxed pl-7">
                        By accessing or using WOXUS_V.1 (the "Multimodal AI Agent Operating System"), you agree to be bound by these Terms and Conditions. This ecosystem includes the Python-based Brain , the Electron-based Body , and the Flutter-based Limb. If you do not agree, you must cease all use of the software immediately.
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-cyber-cyan" /> 2. Description of Service
                    </h3>
                    <p className="leading-relaxed pl-7">
                        WOXUS_V.1 provides a multimodal AI experience that integrates vision, voice, and OS automation. The system is designed to perceive digital contexts via Screen Sight and physical contexts via Mobile Eye , executing workflows across your local environment and cloud APIs.
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-cyber-cyan" /> 3. User Obligations and Agency
                    </h3>
                    <ul className="pl-7 space-y-4">
                        <li className="flex gap-3">
                            <span className="text-cyber-cyan font-bold mt-1">•</span>
                            <span><strong className="text-white">Autonomous Execution:</strong> You acknowledge that WOXUS_V.1 uses "Limb" modules to execute actions within your Operating System, browsers, and office suites. You are responsible for all actions taken by the agent under your session.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-cyber-cyan font-bold mt-1">•</span>
                            <span><strong className="text-white">Third-Party Integration:</strong> Use of the WhatsApp Desktop Integration or Office Automation (Word/Excel) must comply with the respective third-party terms of service.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-cyber-cyan font-bold mt-1">•</span>
                            <span><strong className="text-white">Accuracy of Output:</strong> While powered by Gemini 2.0 Flash, the AI may occasionally produce errors. Users should verify critical outputs, especially in "Excel Mastery" or "Market Intelligence" tasks.</span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-cyber-cyan" /> 4. Cyber-WOXUS & Ethical Use
                    </h3>
                    <p className="leading-relaxed pl-7 mb-4">The Cybersecurity Module is provided strictly for authorized ethical hacking and network monitoring.</p>
                    <ul className="pl-7 space-y-2">
                        <li className="flex gap-3"><span className="text-cyber-cyan">•</span> You shall not use WOXUS_V.1 for unauthorized reconnaissance, generating malicious payloads, or any form of illegal digital intrusion.</li>
                        <li className="flex gap-3"><span className="text-cyber-cyan">•</span> The developers are not liable for any misuse of the security tools provided within the platform.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-cyber-cyan" /> 5. Financial Disclaimer
                    </h3>
                    <p className="leading-relaxed pl-7">
                        The Market Intelligence & Financial Quant module provides technical analysis (RSI, MACD, EMA) and price forecasting. This data is for informational purposes only and does not constitute professional financial advice.
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-cyber-cyan" /> 6. Limitation of Liability
                    </h3>
                    <p className="leading-relaxed pl-7">
                        WOXUS_V.1 is provided "as is." We are not liable for any data loss, system crashes, or financial losses resulting from the use of the autonomous web agents or OS-level hooks.
                    </p>
                </section>
            </div>
        </motion.div>
    );

    const renderPrivacy = () => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8 text-white/80"
        >
            <div>
                <h2 className="text-3xl font-black text-white mb-2">Privacy Policy</h2>
                <p className="text-purple-400 text-sm font-bold tracking-widest uppercase">Effective Date: April 2026</p>
            </div>

            <div className="space-y-6">
                <section>
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-400" /> 1. Information Collection and Sensory Perception
                    </h3>
                    <p className="leading-relaxed pl-7 mb-4">To provide a "Realtime Experience & Execution," WOXUS_V.1 collects the following data types:</p>
                    <ul className="pl-7 space-y-4">
                        <li className="flex gap-3">
                            <span className="text-purple-400 font-bold mt-1">•</span>
                            <span><strong className="text-white">Visual Data (Screen Sight & Mobile Eye):</strong> Real-time screen captures and mobile camera streams are processed to provide contextual debugging and object identification.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-purple-400 font-bold mt-1">•</span>
                            <span><strong className="text-white">Auditory Data:</strong> Voice inputs are captured for sub-300ms latency processing through the Gemini 2.0 Flash Multimodal Live API.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-purple-400 font-bold mt-1">•</span>
                            <span><strong className="text-white">System Data:</strong> Information regarding your OS environment, open applications (e.g., WhatsApp, Word), and network status for the "Limb" to execute commands.</span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-purple-400" /> 2. How Your Data Is Used
                    </h3>
                    <ul className="pl-7 space-y-4">
                        <li className="flex gap-3">
                            <span className="text-purple-400 font-bold mt-1">•</span>
                            <span><strong className="text-white">Real-time Processing:</strong> Data is used to facilitate high-bandwidth workflows and immediate "barge-in" conversations.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-purple-400 font-bold mt-1">•</span>
                            <span><strong className="text-white">Neural Memory:</strong> We utilize a ChromaDB vector database to store past interactions, project names, and preferences. This ensures the agent "grows with you" and provides a personalized experience over time.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-purple-400 font-bold mt-1">•</span>
                            <span><strong className="text-white">Task Execution:</strong> Captured data is routed from the Python "Prefrontal Cortex" to specific modules to perform requested tasks like generating reports or summarizing PDFs.</span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                        <Database className="w-5 h-5 text-purple-400" /> 3. Data Storage and Security
                    </h3>
                    <ul className="pl-7 space-y-4">
                        <li className="flex gap-3"><span className="text-purple-400 font-bold mt-1">•</span><span><strong className="text-white">Local vs. Cloud:</strong> While intelligence is processed via the Gemini API, specific session states and vector memories are managed via your local Python backend.</span></li>
                        <li className="flex gap-3"><span className="text-purple-400 font-bold mt-1">•</span><span><strong className="text-white">System Hardening:</strong> The Cyber-WOXUS module monitors your own system's security posture to identify vulnerabilities and open ports.</span></li>
                        <li className="flex gap-3"><span className="text-purple-400 font-bold mt-1">•</span><span><strong className="text-white">Data Retention:</strong> You may clear your ChromaDB vector memory at any time to reset the agent’s personalized context.</span></li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-purple-400" /> 4. Third-Party Data Sharing
                    </h3>
                    <p className="leading-relaxed pl-7">
                        We do not sell your personal data. Data is shared with Google (for Gemini API processing) and relevant third-party apps only when you explicitly command the AI to interact with them (e.g., sending a file via WhatsApp or researching via Playwright).
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-purple-400" /> 5. Security of Personal Information
                    </h3>
                    <p className="leading-relaxed pl-7">
                        We implement modular, event-driven security protocols. However, as WOXUS_V.1 provides deep system access, users are encouraged to maintain their own system security and persistence checks.
                    </p>
                </section>
            </div>
        </motion.div>
    );

    const renderAPI = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full flex-1"
        >
            <div className="bg-[#050B14] border border-blue-500/30 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(59,130,246,0.15)] relative overflow-hidden">
                {/* Hacker/Terminal Aesthetic Background Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyber-cyan to-blue-500" />
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />

                <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <Terminal className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white font-mono tracking-tight">WOXUS_V.1 API</h2>
                        <p className="text-blue-400 text-xs font-mono tracking-widest uppercase mt-1">Developer Reference & Usage Policy</p>
                    </div>
                </div>

                <p className="text-white/70 mb-10 leading-relaxed text-sm md:text-base">
                    The WOXUS_V.1 API provides high-bandwidth access to our multimodal intelligence engine. This page outlines the specific token quotas, time-based limits, and execution rules required for integration.
                </p>

                <div className="space-y-12">
                    <section>
                        <h3 className="text-blue-300 font-mono font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-blue-500">{'>'}</span> 1. Token Consumption Metrics
                        </h3>
                        <p className="text-white/60 text-sm mb-4">Data in the Woxus ecosystem is measured in "Tokens". Below are the standard consumption rates for multimodal inputs:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: "Text Analysis", desc: "~4 characters = 1 token" },
                                { label: "Standard Word", desc: "100 tokens = ~60-80 English words" },
                                { label: "Auditory Flux", desc: "32 tokens / second" },
                                { label: "Visual Perception", desc: "1,290 tokens / frame" },
                                { label: "Video Streams", desc: "258 tokens / second" },
                                { label: "Doc Intelligence", desc: "~1,290 tokens / PDF page" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-[#0A1222] border border-white/5 p-4 rounded-xl flex items-center justify-between">
                                    <span className="text-white/80 text-sm font-medium">{stat.label}</span>
                                    <span className="text-blue-400 text-xs font-mono bg-blue-500/10 px-2 py-1 rounded">{stat.desc}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-blue-300 font-mono font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-blue-500">{'>'}</span> 2. Time-Based API Quotas
                        </h3>
                        <p className="text-white/60 text-sm mb-4">To ensure stable execution and sub-300ms latency, the following limits apply per project:</p>
                        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0A1222]">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 text-blue-300 font-mono text-xs uppercase">
                                    <tr>
                                        <th className="px-6 py-4 border-b border-white/10">Limit Type</th>
                                        <th className="px-6 py-4 border-b border-white/10">Capacity</th>
                                        <th className="px-6 py-4 border-b border-white/10">Reset Window</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white/80">
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs">RPM (Requests Per Minute)</td>
                                        <td className="px-6 py-4 text-cyber-cyan font-bold">15 Requests</td>
                                        <td className="px-6 py-4">Rolling 60-second window</td>
                                    </tr>
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs">TPM (Tokens Per Minute)</td>
                                        <td className="px-6 py-4 text-cyber-cyan font-bold">1,000,000 Tokens</td>
                                        <td className="px-6 py-4">Rolling 60-second window</td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs">RPD (Requests Per Day)</td>
                                        <td className="px-6 py-4 text-purple-400 font-bold">1,500 Requests</td>
                                        <td className="px-6 py-4">Resets at 08:30 AM IST (00:00 PT)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-blue-300 font-mono font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-blue-500">{'>'}</span> 3. Advanced Execution Rules
                        </h3>
                        <p className="text-white/60 text-sm mb-4">Developers must adhere to these structural policies to maintain connectivity:</p>
                        <ul className="space-y-4">
                            {[
                                ["Project-Wide Quotas", "Limits are applied at the project level. Creating multiple API keys within a single project will not increase your total quota."],
                                ["Long Context Handling", "Single requests exceeding 200,000 tokens trigger a 2x processing multiplier on input data."],
                                ["Neural Memory Caching", "For repetitive high-volume datasets, the engine utilizes context caching to reduce identical input processing by up to 90%."],
                                ["Output Capacity", "Our standard models support up to 64,000 output tokens per single response."],
                                ["System Hardening", "Developers are responsible for implementing Exponential Backoff (1s, 2s, 4s, etc.) to handle '429: Too Many Requests' errors gracefully."]
                            ].map(([title, desc], i) => (
                                <li key={i} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-[#0A1222]/50">
                                    <div className="w-1.5 h-auto bg-blue-500 rounded-full" />
                                    <div>
                                        <strong className="text-white font-mono text-sm block mb-1">{title}</strong>
                                        <span className="text-white/60 text-sm leading-relaxed">{desc}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-blue-300 font-mono font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="text-blue-500">{'>'}</span> 4. Security & Ethical Standards
                        </h3>
                        <div className="grid gap-4">
                            <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-xl">
                                <h4 className="text-red-400 font-bold text-sm mb-2 font-mono">PRIVACY & CYBER-WOXUS</h4>
                                <ul className="space-y-2 text-white/70 text-sm">
                                    <li><span className="text-red-500 mr-2">!</span>Data processed via our production-tier API is not used for model refinement or training.</li>
                                    <li><span className="text-red-500 mr-2">!</span>Use of the integrated security tools is restricted to authorized ethical hacking and system monitoring only.</li>
                                </ul>
                            </div>
                            <div className="bg-green-500/10 border border-green-500/20 p-5 rounded-xl">
                                <h4 className="text-green-400 font-bold text-sm mb-2 font-mono">KEY PROTECTION</h4>
                                <p className="text-white/70 text-sm">
                                    Never expose your API keys in client-side code. Always route requests through a secure server-side environment.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </motion.div>
    );

    return (
        <main className="min-h-screen text-white relative selection:bg-cyber-cyan selection:text-black transition-colors duration-1000 overflow-x-hidden w-full bg-[#020617] pt-24 pb-24">
            <Background />
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">
                {/* Header Phase */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/40 hover:text-cyber-cyan transition-colors text-xs font-bold uppercase tracking-wider mb-8 group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40 tracking-tight mb-4">
                        Legal & API Hub
                    </h1>
                    <p className="text-white/50 text-lg max-w-2xl">
                        Comprehensive documentation covering Woxus system terms, privacy compliance, and developer API references.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* Sticky Sidebar Navigation */}
                    <div className="w-full lg:w-72 lg:sticky lg:top-32 space-y-2 flex-shrink-0">
                        <button
                            onClick={() => setActiveTab('terms')}
                            className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${activeTab === 'terms' ? 'bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan' : 'bg-white/5 border border-transparent text-white/50 hover:bg-white/10 hover:text-white'}`}
                        >
                            <Book className="w-5 h-5" />
                            <span className="font-bold tracking-wide text-sm">Terms & Conditions</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('privacy')}
                            className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${activeTab === 'privacy' ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400' : 'bg-white/5 border border-transparent text-white/50 hover:bg-white/10 hover:text-white'}`}
                        >
                            <Shield className="w-5 h-5" />
                            <span className="font-bold tracking-wide text-sm">Privacy Policy</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('api')}
                            className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${activeTab === 'api' ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400' : 'bg-white/5 border border-transparent text-white/50 hover:bg-white/10 hover:text-white'}`}
                        >
                            <Terminal className="w-5 h-5" />
                            <span className="font-bold tracking-wide text-sm">API Reference</span>
                        </button>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 w-full glass-premium border border-white/10 bg-black/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 min-h-[600px]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'terms' && <div key="terms">{renderTerms()}</div>}
                            {activeTab === 'privacy' && <div key="privacy">{renderPrivacy()}</div>}
                            {activeTab === 'api' && <div key="api">{renderAPI()}</div>}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}
