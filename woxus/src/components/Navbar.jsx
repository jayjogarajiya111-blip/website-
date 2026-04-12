import React, { useState } from 'react';
import { Bot, Menu, X } from 'lucide-react';
import '../styles/index.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg fixed-top glass-panel m-3">
      <div className="container-fluid px-3">
        <a className="navbar-brand d-flex align-items-center text-white fw-bold fs-4" href="#">
          <Bot className="text-info me-2" size={32} color="#00e5ff" />
          WOXUS
        </a>
        <button 
          className="navbar-toggler border-0 shadow-none text-white" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X color="#fff" /> : <Menu color="#fff" />}
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''} justify-content-end`}>
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <a className="nav-link text-white mx-2" href="#home" onClick={() => setIsOpen(false)}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white mx-2" href="#features" onClick={() => setIsOpen(false)}>Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white mx-2" href="#demo" onClick={() => setIsOpen(false)}>Demo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white mx-2" href="#feedback" onClick={() => setIsOpen(false)}>Feedback</a>
            </li>
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <button className="btn btn-outline-glow w-100 mb-2 mb-lg-0">Login</button>
            </li>
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <button className="btn btn-glow w-100">Sign Up</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
