import React from 'react';
import { Bot, Twitter, Github, Linkedin, Disc as Discord } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-5 pb-4 bg-dark mt-5 border-top border-secondary border-opacity-25 relative z-1">
      <div className="container">
        <div className="row gy-4 mb-5">
          <div className="col-lg-4 col-md-6">
            <a className="d-flex align-items-center text-white fw-bold fs-4 text-decoration-none mb-3" href="#">
              <Bot className="text-info me-2" size={32} color="#00e5ff" />
              WOXUS
            </a>
            <p className="text-secondary pe-md-5">
              The next-generation AI assistant that controls your system natively. 
              Run commands, automate tasks, and interact seamlessly.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="text-secondary text-info-hover transition" style={{ transition: 'color 0.2s' }}><Twitter size={20} /></a>
              <a href="#" className="text-secondary text-info-hover transition" style={{ transition: 'color 0.2s' }}><Github size={20} /></a>
              <a href="#" className="text-secondary text-info-hover transition" style={{ transition: 'color 0.2s' }}><Discord size={20} /></a>
              <a href="#" className="text-secondary text-info-hover transition" style={{ transition: 'color 0.2s' }}><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-3">Product</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><a href="#" className="text-secondary text-decoration-none">Features</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Pricing</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Changelog</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">API Documentation</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-3">Company</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><a href="#" className="text-secondary text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Careers</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Blog</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Contact</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-3">Subscribe to Newsletter</h5>
            <p className="text-secondary small mb-3">Get the latest updates on new features and product releases.</p>
            <form className="d-flex m-0">
              <input type="email" className="form-control bg-transparent border-secondary text-white rounded-start shadow-none" placeholder="Email Address" />
              <button className="btn btn-glow rounded-start-0" type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="pt-4 border-top border-secondary border-opacity-25 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-secondary small mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} WOXUS Inc. All rights reserved.
          </p>
          <div className="d-flex gap-3 small">
            <a href="#" className="text-secondary text-decoration-none">Terms of Service</a>
            <a href="#" className="text-secondary text-decoration-none">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
