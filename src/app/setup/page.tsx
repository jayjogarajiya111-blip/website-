"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Globe, Download, User, MessageSquare, Key,
    Settings, Zap, CheckSquare, AlertTriangle, ChevronRight,
    Terminal, Shield, Copy, Check, ExternalLink, BookOpen
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Background from "@/components/visuals/Background";

const sidebarLinks = [
    { name: "OVERVIEW", href: "#overview", icon: BookOpen },
    { name: "STEP 1 — PLAN", href: "#step1", icon: Globe },
    { name: "STEP 2 — UNZIP & READY", href: "#step2", icon: Download },
    { name: "STEP 3 — WELCOME", href: "#step3", icon: User },
    { name: "STEP 4 — LICENSE KEY", href: "#step4", icon: MessageSquare },
    { name: "STEP 5 — ACTIVATE", href: "#step5", icon: Key },
    { name: "STEP 6 — API KEYS", href: "#step6", icon: Settings },
    { name: "STEP 7 — LAUNCH", href: "#step7", icon: Zap },
    { name: "PART 2 — GEMINI API", href: "#gemini", icon: Terminal },
    { name: "CHECKLIST", href: "#checklist", icon: CheckSquare },
    { name: "TROUBLESHOOTING", href: "#troubleshooting", icon: AlertTriangle },
];

const steps = [
    { num: 1, label: "Plan Selection", color: "text-cyber-cyan", border: "border-cyber-cyan/40", bg: "bg-cyber-cyan/10" },
    { num: 2, label: "Download & Unzip", color: "text-blue-400", border: "border-blue-400/40", bg: "bg-blue-400/10" },
    { num: 3, label: "Welcome Page", color: "text-purple-400", border: "border-purple-400/40", bg: "bg-purple-400/10" },
    { num: 4, label: "License via WhatsApp", color: "text-green-400", border: "border-green-400/40", bg: "bg-green-400/10" },
    { num: 5, label: "Activate Key", color: "text-yellow-400", border: "border-yellow-400/40", bg: "bg-yellow-400/10" },
    { num: 6, label: "API Settings", color: "text-orange-400", border: "border-orange-400/40", bg: "bg-orange-400/10" },
    { num: 7, label: "Start Woxus", color: "text-pink-400", border: "border-pink-400/40", bg: "bg-pink-400/10" },
];

function InfoTable({ rows }: { rows: [string, string][] }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 mt-4">
            <table className="w-full text-sm">
                <tbody>
                    {rows.map(([label, value], i) => (
                        <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                            <td className="px-5 py-3 text-white/40 font-mono text-xs uppercase tracking-wider w-1/3">{label}</td>
                            <td className="px-5 py-3 text-white/80 text-xs">{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function CodeBlock({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <div className="relative mt-4 group">
            <pre className="bg-black/60 border border-white/10 rounded-xl p-5 font-mono text-xs text-cyber-cyan overflow-x-auto leading-relaxed">
                {code}
            </pre>
            <button
                onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className="absolute top-3 right-3 p-2 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-cyber-cyan hover:text-black"
            >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
        </div>
    );
}

function SectionBadge({ label }: { label: string }) {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan text-xs font-semibold tracking-wider">
            ✦ {label}
        </div>
    );
}

function StepCard({ num, title, color, border, bg, children }: {
    num: number; title: string; color: string; border: string; bg: string; children: React.ReactNode
}) {
    return (
        <div className={`glass rounded-2xl border ${border} p-8 relative overflow-hidden`}>
            <div className={`absolute top-0 right-0 w-32 h-32 ${bg} blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none`} />
            <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl ${bg} border ${border} flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-xl font-black ${color}`}>{num}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white">{title}</h2>
            </div>
            {children}
        </div>
    );
}

export default function SetupPage() {
    const [activeSection, setActiveSection] = useState("overview");
    const [checklist, setChecklist] = useState<boolean[]>(Array(10).fill(false));

    useEffect(() => {
        const handleScroll = () => {
            const sections = sidebarLinks.map(l => l.href.substring(1));
            const scrollY = window.scrollY + 120;
            for (const sec of sections) {
                const el = document.getElementById(sec);
                if (el) {
                    const { offsetTop, offsetHeight } = el;
                    if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
                        setActiveSection(sec);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleCheck = (i: number) => {
        setChecklist(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
    };

    const checklistItems = [
        "Open aistudio.google.com/app/apikey in your browser",
        "Sign in with your Google / Gmail account",
        "Accept Terms of Service (first time only)",
        "Click the blue \"Create API key\" button",
        "Select \"Create API key in new project\"",
        "Copy the generated key (starts with AIzaSy...)",
        "Save the key in your .env file or password manager",
        "Close the dialog box",
        "Paste the key into Woxus API Settings (Step 6)",
        "Add .env to your .gitignore to keep the key private",
    ];

    return (
        <div className="min-h-screen bg-[#070b14] text-gray-300 font-sans selection:bg-cyber-cyan selection:text-black">
            <Background />
            <Navbar />

            {/* Fixed Sidebar */}
            <aside className="fixed left-0 top-20 w-64 h-[calc(100vh-5rem)] border-r border-[#1a2235] bg-[#0a0f1c]/90 backdrop-blur-xl z-10 overflow-y-auto hidden lg:block">
                <div className="p-5">
                    {/* Back Button */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/40 hover:text-cyber-cyan transition-colors text-xs font-bold uppercase tracking-wider mb-6 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <h2 className="text-sm font-black text-cyber-cyan mb-1 tracking-wider uppercase">Woxus Setup</h2>
                    <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-widest">Version 1.0 · April 2026</p>

                    <nav className="space-y-1">
                        {sidebarLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-medium transition-all duration-200 border-l-2 ${isActive
                                        ? "border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan shadow-[0_0_10px_rgba(34,211,238,0.15)]"
                                        : "border-transparent text-gray-500 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                                    {link.name}
                                </a>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 pt-28 pb-24 px-6 md:px-12 lg:px-16 max-w-5xl relative z-10">

                {/* Mobile Back Button */}
                <div className="lg:hidden mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/50 hover:text-cyber-cyan transition-colors text-sm font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                {/* Hero */}
                <section id="overview" className="mb-16 scroll-mt-28">
                    <SectionBadge label="WOXUS SETUP GUIDE · V1.0 · APRIL 2026" />
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
                        Full Setup &{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-blue-500">
                            User Flow
                        </span>
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
                        From website plan selection to fully running application — complete step by step guide.
                    </p>

                    {/* Quick Reference Steps */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                        {steps.map((s) => (
                            <a key={s.num} href={`#step${s.num}`} className={`glass p-3 rounded-xl border ${s.border} flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer`}>
                                <span className={`text-2xl font-black ${s.color} mb-1`}>{s.num}</span>
                                <span className="text-[9px] text-white/50 leading-tight">{s.label}</span>
                            </a>
                        ))}
                    </div>
                </section>

                <hr className="border-[#1a2235] mb-16" />

                {/* STEP 1 */}
                <section id="step1" className="mb-12 scroll-mt-28">
                    <StepCard num={1} title="Website — Plan Selection" color="text-cyber-cyan" border="border-cyber-cyan/30" bg="bg-cyber-cyan/10">
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Visit the Woxus website and select a plan. Browse plans → purchase → download link.
                        </p>
                        <div className="space-y-2 mb-5">
                            {["Browse the pricing / plans page", "Compare plan features", "Click the desired plan's download or purchase button", "If paid: complete payment (card / UPI / gateway)", "Receive a download link for Woxus.exe"].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <ChevronRight className="w-4 h-4 text-cyber-cyan mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                        <InfoTable rows={[
                            ["Page type", "Marketing / pricing page (web)"],
                            ["Plan data", "Stored on backend — plan ID tied to download token"],
                            ["Download link", "Secure signed URL or direct link to Woxus_V1.zip"],
                            ["Free plan", "Immediately available — no payment step"],
                            ["Paid plan", "Payment gateway confirms, then redirects to download"],
                        ]} />
                    </StepCard>
                </section>

                {/* STEP 2 */}
                <StepCard num={2} title="Download & Unzip the Folder" color="text-blue-400" border="border-blue-400/30" bg="bg-blue-400/10">
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        Woxus is distributed as a ZIP archive. You don't need a traditional installer — just extract and run.
                    </p>
                    <div className="space-y-4 mb-5">
                        <div className="p-4 rounded-xl border border-blue-400/20 bg-blue-400/5">
                            <h3 className="text-white font-bold text-sm mb-2 uppercase tracking-wider">How to Unzip (Extract)</h3>
                            <div className="space-y-2">
                                {[
                                    "Right-click the downloaded 'Woxus_V1.zip' file.",
                                    "Select 'Extract All...' from the menu.",
                                    "Choose a destination folder (e.g., Desktop or Documents).",
                                    "Click 'Extract'. A new folder named 'Woxus_V1' will appear.",
                                    "Open that folder and look for 'Woxus' Application."
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 text-xs">
                                        <span className="text-blue-400 font-bold">{i + 1}.</span>
                                        <span className="text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <InfoTable rows={[
                        ["Archive type", "Standard Windows ZIP (.zip)"],
                        ["Unzip tool", "Built-in Windows File Explorer (no extra software needed)"],
                        ["File inside", "Woxus application + supporting assets"],
                        ["Required OS", "Windows 10 / 11 (64-bit)"],
                        ["Internet required", "Yes — for license validation and AI calls"],
                    ]} />
                </StepCard>

                {/* STEP 3 */}
                <section id="step3" className="mb-12 scroll-mt-28">
                    <StepCard num={3} title="Welcome Page (First Launch)" color="text-purple-400" border="border-purple-400/30" bg="bg-purple-400/10">
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            On first launch, Woxus shows a clean Welcome screen with two input fields only — no password required at this stage.
                        </p>
                        <InfoTable rows={[
                            ["Name", "User's full name — stored in local config for personalisation"],
                            ["WhatsApp Number", "Must include country code (e.g. +91 98765 43210)"],
                            ["Submit button", "Sends the number to the backend WhatsApp Agent"],
                            ["Validation", "Number format validated before submission (regex check)"],
                            ["Storage", "Name + number saved in local app config (config.json)"],
                        ]} />
                        <div className="mt-5 p-4 border border-purple-400/20 bg-purple-400/5 rounded-xl">
                            <p className="text-purple-300 text-xs font-bold mb-1">After Submit</p>
                            <p className="text-gray-400 text-sm">App sends the WhatsApp number to the backend → Backend WhatsApp Agent receives it → A unique License Key is generated → App shows: <span className="text-white font-mono text-xs">"Check your WhatsApp for your license key"</span></p>
                        </div>
                    </StepCard>
                </section>

                {/* STEP 4 */}
                <section id="step4" className="mb-12 scroll-mt-28">
                    <StepCard num={4} title="WhatsApp Agent — License Key Generation" color="text-green-400" border="border-green-400/30" bg="bg-green-400/10">
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Backend generates a unique License Key and sends it via WhatsApp. Key is tied to your phone number and plan.
                        </p>
                        <div className="space-y-2 mb-5">
                            {[
                                "Unique key generated — UUID v4 or HMAC-based alphanumeric string",
                                "Key stored in database tied to phone number and plan",
                                "Expiry date / usage limits attached based on plan purchased",
                                "Key sent to user's WhatsApp as a formatted text message",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                        <InfoTable rows={[
                            ["Trigger", "POST /api/request-license  {phone: '+91...'}"],
                            ["Key format", "XXXX-XXXX-XXXX-XXXX (16-char alphanumeric)"],
                            ["WhatsApp API", "WhatsApp Business Cloud API / WATI / Gupshup"],
                            ["Database", "License table: phone, key, plan, expiry, used_at"],
                            ["Message sent", '"Your Woxus License Key: XXXX-XXXX-XXXX-XXXX"'],
                            ["Security", "Key is single-use for activation; hashed in DB after use"],
                        ]} />
                    </StepCard>
                </section>

                {/* STEP 5 */}
                <section id="step5" className="mb-12 scroll-mt-28">
                    <StepCard num={5} title="Add License Key" color="text-yellow-400" border="border-yellow-400/30" bg="bg-yellow-400/10">
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Paste the license key received on WhatsApp. Key is validated against backend before access is granted.
                        </p>
                        <div className="space-y-2 mb-5">
                            {[
                                "Paste the license key into the input field",
                                "Click Activate",
                                "App sends key to backend: POST /api/validate-license",
                                "Backend checks the key against the database",
                                "If valid: returns plan details + expiry — app unlocks",
                                "If invalid / expired: shows error message with support link",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="text-yellow-400 text-xs font-bold mt-0.5 w-5 flex-shrink-0">{i + 1}.</span>
                                    <span className="text-sm text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                        <InfoTable rows={[
                            ["API endpoint", "POST /api/validate-license  {key, phone}"],
                            ["Success response", "{status: 'ok', plan: 'pro', expiry: '2027-04-01'}"],
                            ["Failure response", "{status: 'error', message: 'Invalid or expired key'}"],
                            ["On success", "Key + plan stored in local config — app proceeds to Step 6"],
                            ["Key storage", "Encrypted locally (AES) — never stored in plain text"],
                        ]} />
                        <div className="mt-5 p-4 border border-yellow-400/30 bg-yellow-400/5 rounded-xl flex gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <p className="text-yellow-200/80 text-xs leading-relaxed">
                                <strong className="text-yellow-400">IMPORTANT:</strong> The license key entered here must be exactly the key received from WhatsApp in Step 4. The app does not allow manual key creation — only the WhatsApp-delivered key will be accepted.
                            </p>
                        </div>
                    </StepCard>
                </section>

                {/* STEP 6 */}
                <section id="step6" className="mb-12 scroll-mt-28">
                    <StepCard num={6} title="API Settings Page" color="text-orange-400" border="border-orange-400/30" bg="bg-orange-400/10">
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Enter API keys — backend saves them to the .env file. Includes Google AI Studio (Gemini) API key and others.
                        </p>
                        <InfoTable rows={[
                            ["Google AI Studio Key", "AIzaSy... (from aistudio.google.com/app/apikey)"],
                            ["Other Service Keys", "Any additional integration keys required by Woxus"],
                            ["Endpoint URL", "Custom API base URL (optional — for enterprise/self-hosted)"],
                            ["Test Connection", "Button to verify each key works before proceeding"],
                            ["Save action", "Backend writes all values to .env file on disk"],
                        ]} />
                        <p className="text-xs text-gray-500 mt-4 mb-2 font-mono uppercase tracking-wider">.env File Structure</p>
                        <CodeBlock code={`GOOGLE_API_KEY=AIzaSyD3xxxxxxxxxxxxxxxxxxxxxxxxxxx\nWOXUS_LICENSE_KEY=XXXX-XXXX-XXXX-XXXX\nWHATSAPP_API_TOKEN=EAAxxxxxxxxxxxxxxxxx`} />
                        <div className="mt-5 grid sm:grid-cols-2 gap-3">
                            {[
                                ".env file stored only on user's local machine — never uploaded",
                                "File permissions set to owner-read-only after writing",
                                "API keys are masked in UI after first save (last 4 chars only)",
                                "Keys are never logged in application logs",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-black/30 border border-white/5">
                                    <Shield className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-xs text-gray-400">{item}</span>
                                </div>
                            ))}
                        </div>
                    </StepCard>
                </section>

                {/* STEP 7 */}
                <section id="step7" className="mb-16 scroll-mt-28">
                    <StepCard num={7} title="Start Woxus" color="text-pink-400" border="border-pink-400/30" bg="bg-pink-400/10">
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            App loads config, connects to APIs, and launches the dashboard. Setup complete — Woxus is fully operational.
                        </p>
                        <div className="space-y-2 mb-5">
                            {[
                                "Click Start Woxus",
                                "App reads .env file — loads all environment variables",
                                "License key verified (local check against stored activation)",
                                "API connections initialised (Google Gemini, WhatsApp, etc.)",
                                "Health check: all services respond OK",
                                "Dashboard loads — user is now inside the Woxus application",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="text-pink-400 text-xs font-bold mt-0.5 w-5 flex-shrink-0">{i + 1}.</span>
                                    <span className="text-sm text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                        <InfoTable rows={[
                            ["Config load", "Backend reads .env via dotenv library at startup"],
                            ["License check", "Local validation + optional periodic remote re-check"],
                            ["API init", "All API clients initialised with keys from .env"],
                            ["Health check", "Each integration pinged — status shown in dashboard sidebar"],
                            ["Error handling", "If any key is invalid, user redirected to API Settings page"],
                            ["Dashboard", "Main Woxus UI loads — all features available per plan"],
                        ]} />
                    </StepCard>
                </section>

                <hr className="border-[#1a2235] mb-16" />

                {/* PART 2 — GEMINI */}
                <section id="gemini" className="mb-16 scroll-mt-28">
                    <SectionBadge label="PART 2 — GOOGLE AI STUDIO API KEY" />
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                        Google AI Studio{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            API Key Guide
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm mb-8">How to generate your Gemini API key and use it in Woxus</p>

                    {/* What is Google AI Studio */}
                    <div className="glass rounded-2xl border border-blue-400/20 p-6 mb-6">
                        <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-blue-400" />
                            What is Google AI Studio?
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Google AI Studio is Google's free web-based platform where you can access and test Gemini AI models. By generating an API key here, you can integrate Gemini into any app — including Woxus — to power AI features.
                        </p>
                        <InfoTable rows={[
                            ["Website", "aistudio.google.com/app/apikey"],
                            ["Models available", "Gemini 2.0 Flash, Gemini 1.5 Flash, Gemini 1.5 Pro"],
                            ["Free tier", "Yes — limited requests per minute (RPM)"],
                            ["Paid tier", "Google Cloud billing — unlimited requests"],
                            ["Key format", "AIzaSy... (39 characters total)"],
                            ["Used in Woxus", "Paste into the API Settings page (Step 6)"],
                        ]} />
                    </div>

                    {/* Steps to get API key */}
                    <div className="space-y-4">
                        {[
                            {
                                num: 1, title: "Open Google AI Studio",
                                desc: "Go to: aistudio.google.com/app/apikey",
                                detail: "Open your browser and navigate to https://aistudio.google.com/app/apikey — you will land on the Google sign-in page if not already logged in.",
                                link: "https://aistudio.google.com/app/apikey"
                            },
                            {
                                num: 2, title: "Sign In with Your Google Account",
                                desc: "Use your Gmail email and password",
                                detail: "Click Sign in → Enter your Gmail address → Enter your password → Complete 2-Step Verification if prompted (enter OTP). First-time users: Google will ask you to accept the Terms of Service.",
                            },
                            {
                                num: 3, title: "Navigate to the API Keys Page",
                                desc: "You should already be there if you used the direct URL",
                                detail: "If you're on aistudio.google.com/app/apikey you're in the right place. If not: look for \"Get API key\" in the left sidebar, or navigate directly to the URL.",
                            },
                            {
                                num: 4, title: "Create a New API Key",
                                desc: "Click the blue \"+ Create API key\" button",
                                detail: "Click \"Create API key\" → A popup appears → For first-time users: select \"Create API key in new project\" → Google automatically creates a new project → Your new API key is generated within a few seconds.",
                            },
                            {
                                num: 5, title: "Copy and Save Your API Key",
                                desc: "⚠️ This is the most important step — the key is only shown once",
                                detail: "After generation, a dialog box shows your API key (starts with AIzaSy...). Click the Copy button → Save the key somewhere safe (Notepad, password manager, or your .env file) → Click Close.",
                            },
                            {
                                num: 6, title: "Paste the Key into Woxus API Settings",
                                desc: "Go to Step 6 in Woxus and enter your key",
                                detail: "Open the Woxus app → navigate to API Settings (Step 6) → Find the field labeled \"Google AI Studio Key\" or \"Gemini API Key\" → Paste your key → Click Test Connection → Click Save → Proceed to Start Woxus (Step 7).",
                            },
                        ].map((s) => (
                            <div key={s.num} className="glass rounded-2xl border border-white/10 p-6 flex gap-5">
                                <div className="w-10 h-10 rounded-xl bg-blue-400/10 border border-blue-400/30 flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-400 font-black text-sm">{s.num}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-white font-bold text-sm">{s.title}</h4>
                                        {s.link && (
                                            <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-cyber-cyan hover:text-white transition-colors">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-cyber-cyan text-xs mb-2 font-mono">{s.desc}</p>
                                    <p className="text-gray-400 text-xs leading-relaxed">{s.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Free Tier Limits */}
                    <div className="mt-8 glass rounded-2xl border border-white/10 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                            <h3 className="text-white font-bold text-sm">Free Tier Limits</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-white/5 text-white/40 text-xs uppercase font-mono">
                                    <tr>
                                        <th className="px-6 py-3 text-left border-b border-white/10">Model</th>
                                        <th className="px-6 py-3 text-left border-b border-white/10">Req / Minute (RPM)</th>
                                        <th className="px-6 py-3 text-left border-b border-white/10">Req / Day (RPD)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Gemini 2.0 Flash", "15 RPM", "1,500 / day"],
                                        ["Gemini 1.5 Flash", "15 RPM", "1,500 / day"],
                                        ["Gemini 1.5 Pro", "2 RPM", "50 / day"],
                                    ].map(([model, rpm, rpd], i) => (
                                        <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 text-white/80 font-mono text-xs">{model}</td>
                                            <td className="px-6 py-4 text-cyber-cyan font-bold text-xs">{rpm}</td>
                                            <td className="px-6 py-4 text-purple-400 text-xs">{rpd}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Code examples */}
                    <div className="mt-6">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-mono mb-3">How to Use Your API Key in Code</p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-[10px] text-cyber-cyan font-mono mb-1">Option A — .env File (Recommended)</p>
                                <CodeBlock code={`GOOGLE_API_KEY=AIzaSyD3xxx...`} />
                            </div>
                            <div>
                                <p className="text-[10px] text-blue-400 font-mono mb-1">Option B — Python</p>
                                <CodeBlock code={`import google.generativeai as genai\ngenai.configure(api_key='AIzaSy...')\nmodel = genai.GenerativeModel(\n    'gemini-1.5-flash')`} />
                            </div>
                            <div>
                                <p className="text-[10px] text-purple-400 font-mono mb-1">Option C — JavaScript</p>
                                <CodeBlock code={`const { GoogleGenerativeAI } = require(\n    '@google/generative-ai'\n);\nconst genAI = new GoogleGenerativeAI(\n    'AIzaSy...'\n);`} />
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="mt-6 p-5 rounded-2xl border border-red-500/20 bg-red-500/5">
                        <h4 className="text-red-400 font-bold text-sm mb-3 flex items-center gap-2">
                            <Shield className="w-4 h-4" /> API Key Security — Best Practices
                        </h4>
                        <ul className="space-y-2">
                            {[
                                "NEVER commit your API key to a public GitHub repository",
                                "Add .env to your .gitignore file to prevent accidental exposure",
                                "Do not share your key with anyone — it is tied to your account",
                                "If a key is leaked, delete it immediately and generate a new one",
                                "Create separate keys for separate projects",
                                "Store keys as environment variables — never hardcode them",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-red-500 text-xs mt-0.5">!</span>
                                    <span className="text-gray-400 text-xs">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <hr className="border-[#1a2235] mb-16" />

                {/* CHECKLIST */}
                <section id="checklist" className="mb-16 scroll-mt-28">
                    <SectionBadge label="QUICK SETUP CHECKLIST" />
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-6">Setup Checklist</h2>
                    <div className="glass rounded-2xl border border-white/10 p-6 space-y-3">
                        {checklistItems.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => toggleCheck(i)}
                                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                            >
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${checklist[i] ? "border-cyber-cyan bg-cyber-cyan" : "border-white/20 group-hover:border-cyber-cyan/50"}`}>
                                    {checklist[i] && <Check className="w-3 h-3 text-black" />}
                                </div>
                                <span className={`text-sm transition-colors ${checklist[i] ? "text-white/40 line-through" : "text-gray-300"}`}>{item}</span>
                            </button>
                        ))}
                        <div className="pt-3 border-t border-white/10">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">{checklist.filter(Boolean).length} / {checklist.length} completed</span>
                                <div className="h-1.5 bg-white/10 rounded-full w-48 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-cyber-cyan rounded-full"
                                        animate={{ width: `${(checklist.filter(Boolean).length / checklist.length) * 100}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TROUBLESHOOTING */}
                <section id="troubleshooting" className="mb-16 scroll-mt-28">
                    <SectionBadge label="TROUBLESHOOTING & FAQs" />
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-6">Common Issues</h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: "I did not receive my WhatsApp license key",
                                answers: [
                                    "Ensure you entered the correct WhatsApp number with country code (e.g. +91 for India)",
                                    "Check that your WhatsApp number is active and can receive messages",
                                    "Wait up to 2 minutes — WhatsApp delivery can be slightly delayed",
                                    "Restart the app and re-submit your number on the Welcome page",
                                ]
                            },
                            {
                                q: "My license key shows as invalid",
                                answers: [
                                    "Make sure you copied the complete key — format is XXXX-XXXX-XXXX-XXXX",
                                    "Do not add any spaces before or after the key",
                                    "Each key can only be activated once — if already used, contact support",
                                ]
                            },
                            {
                                q: "API connection fails on the API Settings page",
                                answers: [
                                    "Double-check the API key was copied correctly (no missing characters)",
                                    "Verify the key is active on the API provider's dashboard",
                                    "Ensure your internet connection is active",
                                    "Try the Test Connection button before saving",
                                ]
                            },
                            {
                                q: "App does not launch after install",
                                answers: [
                                    "Right-click the desktop shortcut and run as Administrator",
                                    "Check Windows Defender / Antivirus is not blocking the app",
                                    "Reinstall from a freshly downloaded Woxus.exe",
                                ]
                            },
                            {
                                q: "\"API key not valid\" error in Google AI Studio",
                                answers: [
                                    "Check that the key was copied completely — no extra spaces",
                                    "Verify the key has not been deleted from the API Keys page",
                                    "Confirm you are using the correct project's key",
                                ]
                            },
                            {
                                q: "\"Quota exceeded\" error",
                                answers: [
                                    "You have hit the free tier request limit — wait a minute for per-minute limit to reset",
                                    "If the daily limit is reached, wait until the next day",
                                    "Enable billing for production use",
                                ]
                            },
                        ].map((faq, i) => (
                            <div key={i} className="glass rounded-2xl border border-white/10 p-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <h4 className="text-white font-bold text-sm">{faq.q}</h4>
                                </div>
                                <ul className="space-y-2 pl-8">
                                    {faq.answers.map((a, j) => (
                                        <li key={j} className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 text-cyber-cyan mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-400 text-xs">{a}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Support */}
                <section className="mb-16">
                    <div className="glass rounded-2xl border border-cyber-cyan/20 p-8 text-center">
                        <h3 className="text-white font-black text-xl mb-2">Need Help?</h3>
                        <p className="text-gray-400 text-sm mb-6">Contact the Woxus support team via any of these channels</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="mailto:woxus4444ai@gmail.com" className="px-6 py-3 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-xl text-cyber-cyan text-sm font-bold hover:bg-cyber-cyan/20 transition-colors">
                                woxus4444ai@gmail.com
                            </a>
                            <a href="https://woxus.com/support" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm font-bold hover:bg-white/10 transition-colors flex items-center gap-2 justify-center">
                                woxus.com/support <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                        <p className="text-gray-600 text-xs mt-4">Or message the same Woxus Business WhatsApp number that sent your license key</p>
                    </div>
                </section>

                {/* Back to home button at bottom */}
                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white/60 font-bold hover:bg-white/10 hover:text-white transition-all group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Woxus Home
                    </Link>
                </div>

            </main>
        </div>
    );
}
