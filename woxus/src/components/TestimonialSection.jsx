import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialSection = () => {
  const reviews = [
    {
      name: "Alex Mercer",
      role: "Software Engineer",
      text: "Best AI assistant I’ve used! It completely changed how I interact with my terminal. The voice execution is flawless."
    },
    {
      name: "Sarah Jenkins",
      role: "Product Manager",
      text: "WOXUS automates 30% of my daily tasks. Setting up complex environments is now just a single voice command."
    },
    {
      name: "David Chen",
      role: "Data Scientist",
      text: "The personalized personality approach is brilliant. WOXX is incredibly precise and accurate for my analytical workflows."
    }
  ];

  return (
    <section className="section-padding position-relative">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold text-white mb-3 text-gradient">Loved By Professionals</h2>
        </div>

        <div className="row g-4">
          {reviews.map((review, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <div className="glass-panel p-4 h-100 position-relative">
                <Quote size={40} color="rgba(0, 229, 255, 0.2)" className="position-absolute top-0 end-0 m-3" />
                <div className="d-flex text-warning mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-light fs-5 fst-italic mb-4">"{review.text}"</p>
                <div>
                  <h5 className="text-white mb-0">{review.name}</h5>
                  <span className="text-secondary small">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
