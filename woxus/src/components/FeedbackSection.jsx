import React, { useState } from 'react';
import { Star } from 'lucide-react';

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <section id="feedback" className="section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-white mb-3">We Value Your Feedback</h2>
              <p className="text-secondary">Help us improve WOXUS by sharing your experience.</p>
            </div>

            <div className="glass-panel p-4 p-md-5">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label className="form-label text-light fw-semibold">Rate your experience</label>
                  <div className="d-flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={32}
                        className="cursor-pointer"
                        style={{ cursor: 'pointer', transition: 'color 0.2s', color: (hoveredRating || rating) >= star ? '#ffc107' : '#495057' }}
                        fill={(hoveredRating || rating) >= star ? '#ffc107' : 'none'}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <input type="text" className="form-control bg-dark border-secondary text-white shadow-none" placeholder="Your Name" required />
                </div>
                
                <div className="mb-3">
                  <input type="email" className="form-control bg-dark border-secondary text-white shadow-none" placeholder="Email Address" required />
                </div>
                
                <div className="mb-4">
                  <textarea className="form-control bg-dark border-secondary text-white shadow-none" rows="4" placeholder="Your Message" required></textarea>
                </div>
                
                <button type="submit" className="btn btn-glow w-100 py-2 fs-5">Submit Feedback</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
