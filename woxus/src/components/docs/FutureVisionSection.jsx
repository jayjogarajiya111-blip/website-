import React from 'react';
import { ArrowRight } from 'lucide-react';

const FutureVisionSection = () => {
  return (
    <section id="conclusion" className="py-5 text-center">
      <div className="mb-4">
        <h2 className="display-6 fw-bold text-white mb-3">Future Vision</h2>
        <p className="text-muted lead mx-auto" style={{ maxWidth: '800px', lineHeight: '1.7' }}>
          WOXUS V1 is the first step toward a future where computing is not a tool we use, but a partner we collaborate with. We are moving toward total environmental autonomy and zero-click task planning.
        </p>
      </div>
      <button className="btn btn-outline-info text-cyan border-cyan fw-bold px-4 py-2 mt-3 d-flex align-items-center mx-auto" style={{ backgroundColor: 'rgba(34, 211, 238, 0.05)' }}>
        JOIN THE DEVELOPER WAITLIST <ArrowRight className="ms-2" size={18} />
      </button>
    </section>
  );
};

export default FutureVisionSection;
