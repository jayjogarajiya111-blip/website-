"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Nav, Tab, Form } from "react-bootstrap";
import { Check, LogIn, X } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Pricing.css";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

interface Plan {
  id: string;
  title: string;
  price: number;
  durationShort: string;
  durationLabel: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "windows-1m",
    title: "Windows Plan (1 Month)",
    price: 299,
    durationShort: "/ month",
    durationLabel: "/mo",
    features: [
      "Full AI Command Access",
      "Voice Control",
      "Automation Tools",
      "Smart Chat",
      "Basic Support",
    ],
  },
  {
    id: "windows-3m",
    title: "Windows Plan (3 Months)",
    price: 549,
    durationShort: "/ 3 months",
    durationLabel: "/3mo",
    features: [
      "Full AI Command Access",
      "Voice Control",
      "Automation Tools",
      "Smart Chat",
      "Basic Support",
    ],
  }
];

export default function BootstrapPricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [showSignInAlert, setShowSignInAlert] = useState(false);

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
    // Block payment if not signed in
    if (!user) {
      setShowSignInAlert(true);
      setTimeout(() => setShowSignInAlert(false), 4000);
      return;
    }
    setSelectedPlan(plan);
    setPaymentSuccess(false);

    // Smooth scroll to payment section after a slight delay to allow render
    setTimeout(() => {
      paymentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
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

                  <div className="payment-summary d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="text-white mb-1">{selectedPlan.title}</h5>
                    </div>
                    <h4 className="text-info mb-0 fw-bold">₹{selectedPlan.price}<span className="fs-6 text-white-50 fw-normal">{selectedPlan.durationLabel}</span></h4>
                  </div>

                  <Tab.Container defaultActiveKey="upi">
                    <Nav variant="tabs" className="nav-tabs-custom justify-content-center">
                      <Nav.Item>
                        <Nav.Link eventKey="upi">UPI PAYMENT</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="card">CARD PAYMENT</Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content>
                      <Tab.Pane eventKey="upi">
                        <Form onSubmit={handlePayment}>
                          <Form.Group className="mb-4">
                            <Form.Label className="form-label">Enter UPI ID</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="example@upi"
                              className="custom-input"
                              required
                              disabled={isProcessing || paymentSuccess}
                            />
                          </Form.Group>

                          <button
                            type="submit"
                            className="btn btn-pay"
                            disabled={isProcessing || paymentSuccess}
                          >
                            {isProcessing ? "Processing..." : paymentSuccess ? "Verified" : "Pay via UPI"}
                          </button>
                        </Form>
                      </Tab.Pane>

                      <Tab.Pane eventKey="card">
                        <Form onSubmit={handlePayment}>
                          <Form.Group className="mb-3">
                            <Form.Label className="form-label">Card Number</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="0000 0000 0000 0000"
                              className="custom-input"
                              required
                              disabled={isProcessing || paymentSuccess}
                            />
                          </Form.Group>

                          <Row>
                            <Col xs={6}>
                              <Form.Group className="mb-3">
                                <Form.Label className="form-label">Expiry Date</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="MM/YY"
                                  className="custom-input"
                                  required
                                  disabled={isProcessing || paymentSuccess}
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={6}>
                              <Form.Group className="mb-3">
                                <Form.Label className="form-label">CVV</Form.Label>
                                <Form.Control
                                  type="password"
                                  placeholder="***"
                                  className="custom-input"
                                  maxLength={3}
                                  required
                                  disabled={isProcessing || paymentSuccess}
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <Form.Group className="mb-4">
                            <Form.Label className="form-label">Card Holder Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="John Doe"
                              className="custom-input"
                              required
                              disabled={isProcessing || paymentSuccess}
                            />
                          </Form.Group>

                          <button
                            type="submit"
                            className="btn btn-pay"
                            disabled={isProcessing || paymentSuccess}
                          >
                            {isProcessing ? "Processing..." : paymentSuccess ? "Verified" : "Pay with Card"}
                          </button>
                        </Form>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>

                  {paymentSuccess && (
                    <div className="success-msg">
                      Payment Successful ✅ (Demo Mode)
                    </div>
                  )}

                </div>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}
