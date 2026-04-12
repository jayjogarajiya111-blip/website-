import React, { useState, useEffect } from 'react';
import { Terminal, Copy } from 'lucide-react';

const TerminalSection = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    setIsTyping(true);
    setOutput('');
    
    setTimeout(() => {
      setOutput(`Executing: ${command}... \n[OK] Action performed successfully.`);
      setIsTyping(false);
      setCommand('');
    }, 1500);
  };

  const exampleCommands = [
    "Open Chrome", "Open VS Code", "Play Music", "Check Weather"
  ];

  return (
    <section id="demo" className="section-padding position-relative">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-white mb-3">AI Command Terminal</h2>
          <p className="text-secondary">Type a command to see how WOXUS interacts with your system.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="glass-panel overflow-hidden border-info shadow-lg" style={{ borderColor: 'rgba(0,229,255,0.3) !important' }}>
              <div className="bg-dark px-3 py-2 d-flex align-items-center justify-content-between border-bottom border-dark">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle bg-danger" style={{ width: 12, height: 12 }}></div>
                  <div className="rounded-circle bg-warning" style={{ width: 12, height: 12 }}></div>
                  <div className="rounded-circle bg-success" style={{ width: 12, height: 12 }}></div>
                </div>
                <div className="text-secondary small d-flex align-items-center">
                  <Terminal size={14} className="me-2" /> woxus@terminal ~
                </div>
                <div></div>
              </div>
              
              <div className="p-4 bg-transparent" style={{ minHeight: '300px', fontFamily: 'monospace' }}>
                <div className="mb-4 text-secondary small">
                  <div>Welcome to WOXUS Terminal v2.0.0</div>
                  <div>Type a command below or try one of the examples.</div>
                </div>

                <div className="mb-4">
                  <span className="text-info">Examples:</span>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {exampleCommands.map((cmd, idx) => (
                      <span key={idx} className="badge bg-dark border border-secondary text-light p-2 cursor-pointer" onClick={() => setCommand(cmd)} style={{ cursor: 'pointer' }}>
                        {cmd}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="d-flex flex-column gap-3">
                  <form onSubmit={handleCommandSubmit} className="d-flex align-items-center">
                    <span className="text-success me-2">➜</span>
                    <span className="text-info me-2">~</span>
                    <input 
                      type="text" 
                      className="bg-transparent border-0 text-white flex-grow-1 shadow-none outline-none focus-ring-0" 
                      placeholder="Type a command..." 
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      style={{ outline: 'none' }}
                      disabled={isTyping}
                    />
                  </form>

                  {(isTyping || output) && (
                    <div className="mt-2 text-warning ps-4">
                      {isTyping ? (
                        <span className="typing-effect text-cyan">Processing...</span>
                      ) : (
                        <div className="text-light" style={{ whiteSpace: 'pre-line' }}>{output}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalSection;
