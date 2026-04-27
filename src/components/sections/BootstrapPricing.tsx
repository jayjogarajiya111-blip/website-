"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Tab, Form } from "react-bootstrap";
import { Check, LogIn, X, Zap, Shield, Globe, Lock } from "lucide-react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Pricing.css";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import Script from "next/script";
import { useRouter } from "next/navigation";

interface Plan {
  id: string;
  title: string;
  price: number;
  durationShort: string;
  durationLabel: string;
  features: string[];
  downloadUrl: string;
}

const plans: Plan[] = [
  {
    id: "windows-1m",
    title: "Windows Plan (1 Month)",
    price: 99,
    durationShort: "/ month",
    durationLabel: "/mo",
    features: [
      "Full AI Command Access",
      "Voice Control",
      "Automation Tools",
      "Smart Chat",
      "Basic Support",
    ],
    downloadUrl: "https://github.com/jayjogarajiya111-blip/website-/releases/download/v1.0/WOXUS_V.1.Setup.1.7.1.zip",
  },
  {
    id: "windows-3m",
    title: "Windows Plan (3 Months)",
    price: 249,
    durationShort: "/ 3 months",
    durationLabel: "/3mo",
    features: [
      "Full AI Command Access",
      "Voice Control",
      "Automation Tools",
      "Smart Chat",
      "Basic Support",
    ],
    downloadUrl: "https://github.com/jayjogarajiya111-blip/website-/releases/download/v1.0/WOXUS_V.1.Setup.1.7.1.zip",
  }
];

export default function BootstrapPricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [showSignInAlert, setShowSignInAlert] = useState(false);

  const router = useRouter();
  const paymentSectionRef = useRef<HTMLDivElement>(null);

  // Watch Firebase auth state
  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (active) setUser(currentUser);
    });
    return () => { active = false; unsubscribe(); };
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    // Block payment if not signed in - Redirect to login
    if (!user) {
      router.push("/login?callbackUrl=" + encodeURIComponent(window.location.pathname));
      return;
    }
    setSelectedPlan(plan);
    setPaymentSuccess(false);

    // Smooth scroll to payment section after a slight delay to allow render
    setTimeout(() => {
      paymentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan || !user) return;

    setIsProcessing(true);

    try {
      // 1. Create order on server
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedPlan.price,
          currency: "INR",
          email: user.email,
          planId: selectedPlan.id,
        }),
      });

      const order = await response.json();

      if (!response.ok) throw new Error(order.error || "Failed to create order");

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "WOXUS",
        description: `Subscription for ${selectedPlan.title}`,
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify payment on server
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.verified) {
            setPaymentSuccess(true);
            setIsProcessing(false);
            // Redirect to success page to show token
            router.push('/success');
          } else {
            alert("Payment verification failed!");
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user.displayName || "",
          email: user.email || "",
        },
        theme: {
          color: "#a855f7",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="pricing-section-container">
      <Container>

        {/* Sign-In Required Alert Toast */}
        {showSignInAlert && (
          <div
            style={{
              position: 'fixed',
              top: '90px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
              border: '1px solid rgba(168,85,247,0.5)',
              borderRadius: '16px',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 0 40px rgba(168,85,247,0.3)',
              minWidth: '320px',
              maxWidth: '90vw',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            <div style={{ background: 'rgba(168,85,247,0.2)', borderRadius: '50%', padding: '8px', flexShrink: 0 }}>
              <LogIn size={20} color="#c084fc" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: '14px' }}>Sign In Required</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '12px' }}>Please sign in with Google first to select a plan.</p>
            </div>
            <button
              onClick={() => setShowSignInAlert(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: '4px', flexShrink: 0 }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="pricing-title">Choose Your Plan</h2>
          <p className="pricing-subtitle">Unlock full AI assistant capabilities.</p>
        </div>

        {/* Pricing Cards */}
        <Row className="justify-content-center g-4">
          {plans.map((plan) => (
            <Col md={6} lg={5} key={plan.id}>
              <div className={`pricing-card ${selectedPlan?.id === plan.id ? 'selected-card' : ''}`}>

                <h3 className="plan-title">{plan.title}</h3>
                <div className="plan-price">
                  ₹{plan.price} <small>{plan.durationShort}</small>
                </div>

                <ul className="feature-list">
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <i className="bi bi-check-circle-fill"><Check size={18} /></i>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className="btn btn-select-plan"
                  onClick={() => handleSelectPlan(plan)}
                >
                  {selectedPlan?.id === plan.id ? "Selected" : "Select Plan"}
                </button>
              </div>
            </Col>
          ))}
        </Row>

        {/* Payment Section - Appears only when a plan is selected */}
        {selectedPlan && (
          <div className="payment-section" ref={paymentSectionRef}>
            <Row className="justify-content-center">
              <Col lg={8} xl={7}>
                <div className="payment-card">
                  <div className="text-center mb-4">
                    <h3 className="pricing-title fs-3">Complete Your Subscription</h3>
                  </div>

                  <div className="payment-summary d-flex justify-content-between align-items-center p-4 rounded-3xl bg-white/5 border border-white/10 mb-5 shadow-inner">
                    <div className="d-flex align-items-center gap-3">
                      <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-500/30">
                        <Zap size={24} className="text-purple-400" />
                      </div>
                      <div>
                        <h5 className="text-white mb-0 fw-bold tracking-tight">{selectedPlan.title}</h5>
                        <p className="text-white-50 mb-0 small uppercase tracking-widest font-bold" style={{ fontSize: '10px' }}>Active Membership</p>
                      </div>
                    </div>
                    <div className="text-end">
                      <h4 className="text-info mb-0 fw-black">₹{selectedPlan.price}</h4>
                      <span className="fs-6 text-white-50 fw-normal uppercase tracking-tighter" style={{ fontSize: '11px' }}>{selectedPlan.durationLabel}</span>
                    </div>
                  </div>

                  <div className="payment-action-container mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePayment}
                      className="btn-pay-premium w-100"
                      disabled={isProcessing || paymentSuccess}
                    >
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        {isProcessing ? (
                          <>
                            <div className="spinner-border spinner-border-sm text-light" role="status" />
                            <span className="uppercase tracking-[0.2em] font-bold">Initializing Secure Checkout...</span>
                          </>
                        ) : paymentSuccess ? (
                          <>
                            <Check size={20} className="text-green-400" />
                            <span className="uppercase tracking-[0.2em] font-bold">Transaction Complete ✅</span>
                          </>
                        ) : (
                          <>
                            <Lock size={16} />
                            <span className="uppercase tracking-[0.2em] font-bold">Unlock Access Now</span>
                          </>
                        )}
                      </div>
                    </motion.button>

                    <div className="d-flex justify-content-center align-items-center gap-4 mt-4 opacity-40">
                      <Shield size={14} className="text-white" />
                      <Globe size={14} className="text-white" />
                      <Lock size={14} className="text-white" />
                    </div>

                    <p className="text-center text-white-50 mt-4 small uppercase tracking-widest font-black" style={{ fontSize: '9px' }}>
                      Certified Secure Payment Gateway • Powered by Razorpay
                    </p>
                  </div>

                  {paymentSuccess && (
                    <div className="text-center">
                      <div className="success-msg mb-4">
                        Payment Successful ✅
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (selectedPlan) {
                            const link = document.createElement('a');
                            link.href = selectedPlan.downloadUrl;
                            link.download = selectedPlan.downloadUrl.split('/').pop() || "Woxus.zip";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }
                        }}
                        className="btn btn-primary px-5 py-3 rounded-xl font-bold uppercase tracking-wider shadow-lg hover:shadow-blue-500/50"
                        style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none' }}
                      >
                        Download Your Woxus Package
                      </motion.button>
                      <p className="mt-3 text-white-50 small uppercase tracking-widest" style={{ fontSize: '10px' }}>
                        Your license for {selectedPlan.title} is now active.
                      </p>
                    </div>
                  )}

                </div>
              </Col>
            </Row>
          </div>
        )}
      </Container>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
}
