"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Landmark, Smartphone, QrCode, ShieldCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    price: string;
    orderId: string;
}

type PaymentMethod = "upi" | "card" | "netbanking";

export default function PaymentModal({ isOpen, onClose, price, orderId }: PaymentModalProps) {
    const [method, setMethod] = useState<PaymentMethod>("upi");
    const [cardNumber, setCardNumber] = useState("");

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const banks = ["HDFC", "SBI", "ICICI", "Axis", "Kotak", "PNB"];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-cyber-black/80 backdrop-blur-md"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl glass rounded-3xl overflow-hidden neon-border"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 flex items-center justify-center border border-cyber-cyan/20">
                            <ShieldCheck className="text-cyber-cyan w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-white font-bold uppercase tracking-wider">Secure Checkout</h2>
                            <p className="text-white/40 text-[10px] uppercase font-mono">Order ID: {orderId}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row h-[500px]">
                    {/* Sidebar */}
                    <div className="w-full md:w-48 bg-white/5 border-r border-white/5 p-4 flex md:flex-col gap-2">
                        {[
                            { id: "upi", icon: Smartphone, label: "UPI" },
                            { id: "card", icon: CreditCard, label: "Cards" },
                            { id: "netbanking", icon: Landmark, label: "Netbanking" },
                        ].map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMethod(m.id as PaymentMethod)}
                                className={cn(
                                    "flex-1 md:flex-none flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all",
                                    method === m.id
                                        ? "bg-cyber-cyan text-cyber-black font-bold"
                                        : "text-white/50 hover:bg-white/5"
                                )}
                            >
                                <m.icon className="w-6 h-6" />
                                <span className="text-[10px] uppercase tracking-widest">{m.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 overflow-y-auto relative">
                        <AnimatePresence mode="wait">
                            {method === "upi" && (
                                <motion.div
                                    key="upi"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center space-y-4">
                                        <div className="relative inline-block">
                                            <div className="w-40 h-40 bg-white/5 rounded-2xl border border-cyber-cyan/30 flex items-center justify-center p-4">
                                                <QrCode className="w-full h-full text-cyber-cyan animate-pulse" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-cyber-cyan/10 to-transparent animate-pulse" />
                                            </div>
                                            <div className="mt-4 flex justify-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                                    <span className="text-[8px] font-bold text-cyber-cyan">GPay</span>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                                    <span className="text-[8px] font-bold text-cyber-cyan">Pe</span>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                                    <span className="text-[8px] font-bold text-cyber-cyan">Py</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-white/60 text-sm">Scan QR with any UPI App to pay</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Enter UPI ID (e.g., user@okicici)"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyber-cyan transition-colors"
                                            />
                                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyber-cyan text-cyber-black px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">Verify</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {method === "card" && (
                                <motion.div
                                    key="card"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    {/* Virtual Card Preview */}
                                    <div className="aspect-[1.586/1] w-full bg-gradient-to-br from-cyber-cyan/20 to-cyber-blue/20 rounded-2xl border border-white/20 p-6 flex flex-col justify-between relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/10 blur-3xl -mr-16 -mt-16 rounded-full" />
                                        <div className="flex justify-between items-start">
                                            <div className="w-10 h-8 bg-yellow-500/20 rounded-md border border-yellow-500/30" />
                                            <span className="text-white/40 text-xs font-mono uppercase tracking-widest italic">Encrypted System</span>
                                        </div>
                                        <div className="text-white text-xl font-mono tracking-widest leading-none">
                                            {cardNumber || "•••• •••• •••• ••••"}
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="space-y-1">
                                                <span className="text-[8px] text-white/30 uppercase tracking-widest">Card Holder</span>
                                                <div className="text-white text-xs font-medium uppercase tracking-wider">Neural Mesh User</div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="space-y-1">
                                                    <span className="text-[8px] text-white/30 uppercase tracking-widest">Expiry</span>
                                                    <div className="text-white text-xs font-mono italic">MM/YY</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2 space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-white/40">Card Number</label>
                                            <input
                                                type="text"
                                                maxLength={16}
                                                onChange={(e) => setCardNumber(e.target.value.replace(/\d{4}(?=\d)/g, '$& '))}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyber-cyan transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-white/40">Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyber-cyan transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-white/40">CVV</label>
                                            <input
                                                type="password"
                                                maxLength={3}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyber-cyan transition-colors"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {method === "netbanking" && (
                                <motion.div
                                    key="netbanking"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-2 gap-3">
                                        {banks.map((bank) => (
                                            <button
                                                key={bank}
                                                className="p-4 bg-white/5 border border-white/10 rounded-xl text-white/80 text-xs font-bold uppercase tracking-wider hover:border-cyber-cyan transition-all flex items-center justify-between"
                                            >
                                                {bank}
                                                <ChevronRight className="w-3 h-3 text-cyber-cyan" />
                                            </button>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm outline-none appearance-none focus:border-cyber-cyan transition-colors">
                                            <option className="bg-cyber-black">Select Other Bank</option>
                                        </select>
                                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 w-4 h-4 text-white/40" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-white/5 flex items-center justify-between">
                    <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-widest text-white/30">Total Payable</span>
                        <div className="text-xl font-black text-white">₹{price}</div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-cyber-cyan text-cyber-black px-10 py-3 rounded-xl font-black uppercase tracking-wider shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    >
                        Authorize Payment
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
