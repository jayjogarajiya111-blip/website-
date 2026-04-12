import React from 'react';
import { Mic, Settings, MessageSquare, Laptop2, Shield, UserFocus } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Mic size={32} color="#00e5ff" />,
      title: "Voice Control",
      desc: "Control your system using voice commands seamlessly."
    },
    {
      icon: <Settings size={32} color="#0077ff" />,
      title: "Automation",
      desc: "Automate repetitive daily tasks and workflows automatically."
    },
    {
      icon: <MessageSquare size={32} color="#00e5ff" />,
      title: "Smart Chat",
      desc: "Chat with AI for instant answers to complex queries."
    },
    {
      icon: <Laptop2 size={32} color="#0077ff" />,
      title: "Cross Platform",
      desc: "Use across multiple devices and operating systems."
    },
    {
      icon: <Shield size={32} color="#00e5ff" />,
      title: "Security",
      desc: "Your data is protected securely with end-to-end encryption."
    },
    {
      icon: <UserFocus size={32} color="#0077ff" />,
      title: "Personal Assistant",
      desc: "AI that learns your preferences over time to serve you better."
    }
  ];

  return (
    <section id="features" className="section-padding">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-white mb-3">Power User Features</h2>
          <p className="text-secondary">Designed for professionals who need more than just simple answers.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {features.map((feature, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <div 
                className="glass-panel p-4 h-100 d-flex flex-column align-items-start"
                style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 229, 255, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
                }}
              >
                <div className="mb-4 bg-dark p-3 rounded text-center d-inline-block border border-secondary border-opacity-50 shadow">
                  {feature.icon}
                </div>
                <h4 className="text-white fw-semibold mb-3">{feature.title}</h4>
                <p className="text-secondary mb-0">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
