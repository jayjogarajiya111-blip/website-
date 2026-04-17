"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Cpu, Shield, Zap, Globe, Download } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Background from "@/components/visuals/Background";
import SaturnVisual from "@/components/visuals/SaturnVisual";
import WoxusLogo from "@/components/visuals/WOXUSlogo";
import AssistantAvatar from "@/components/visuals/AssistantAvatar";
import BootstrapPricing from "@/components/sections/BootstrapPricing";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TerminalSection from "@/components/sections/TerminalSection";
import AssistantSettings, { AssistantType } from "@/components/settings/AssistantSettings";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  const [assistant, setAssistant] = useState<AssistantType>("woxx");
  const [isListening, setIsListening] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Persist assistant selection
  React.useEffect(() => {
    const saved = localStorage.getItem("woxus_assistant") as AssistantType;
    if (saved) setAssistant(saved);
  }, []);

  const handleAssistantSelect = (type: AssistantType) => {
    setAssistant(type);
    localStorage.setItem("woxus_assistant", type);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <main className={`min-h-screen text-white relative selection:bg-cyber-cyan selection:text-black transition-colors duration-1000 overflow-x-hidden w-full max-w-[100vw] ${assistant === 'woxie' ? 'bg-[#0f172a]' : 'bg-[#020617]'
      }`}>
      <Background />

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Assistant Avatar Floating at Top Right */}
        <div className="absolute top-32 right-8 z-50 scale-75 md:scale-100 origin-right">
          <AssistantAvatar type={assistant} isListening={isListening} />
        </div>

        {/* Central Visual Assembly */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-full max-w-4xl aspect-square flex items-center justify-center"
          >
            {/* Saturn Technical Component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <SaturnVisual />
            </div>

            {/* The Floating Woxus Logo */}
            <div className="relative z-10">
              <WoxusLogo />
            </div>

            {/* Mic Button Removed As Requested */}
          </motion.div>

        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Terminal Section */}
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <TerminalSection />
      </motion.div>

      {/* Features Section */}
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <FeaturesSection />
      </motion.div>

      {/* Assistant Selection */}
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <AssistantSettings
          selectedAssistant={assistant}
          onSelect={handleAssistantSelect}
        />
      </motion.div>

      {/* Pricing / Subscription Section */}
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <BootstrapPricing />
      </motion.div>

      {/* Ultimate CTA Section */}
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative z-20 py-8 flex justify-center w-full mt-[-20px] mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
          {/* Button 2: Set Up WOXUS */}
          <Link href="/setup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-2xl blur opacity-60 group-hover:opacity-100 group-hover:blur-lg transition duration-300"></div>
              <div className="relative px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center gap-3 border border-purple-400/50">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-yellow-300 fill-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]" />
                <span className="font-extrabold tracking-widest text-white uppercase text-sm sm:text-base text-shadow-sm">Set Up Woxus</span>
              </div>
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Testimonials />
      </motion.div>


      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black/50 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center relative">
                <div className="w-full h-full drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]">
                  <svg viewBox="0 0 100 100" fill="none" strokeWidth="12" strokeLinejoin="miter">
                    <defs>
                      <linearGradient id="foxModalFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d8b4fe" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#4c1d95" />
                      </linearGradient>
                    </defs>
                    <path d="M 75 25 L 20 60" stroke="url(#foxModalFooter)" />
                    <path d="M 75 25 L 90 60 L 50 90 L 10 60 L 25 25 L 80 60" stroke="url(#foxModalFooter)" />
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 uppercase drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                Woxus
              </span>
            </div>
            <p className="text-white/30 text-xs uppercase tracking-widest text-center md:text-left">
              Advanced Neural Processing System.<br />
              All Rights Reserved © 2026.
            </p>
          </div>

          <div className="flex gap-8">
            <Link href="/legal" className="text-white/30 hover:text-cyber-cyan transition-colors text-[10px] font-bold uppercase tracking-widest">
              LEGAL & API
            </Link>
          </div>
        </div>
      </footer>

      {/* Payment Modal Removed as BootstrapPricing handles payments */}

    </main>
  );
}
