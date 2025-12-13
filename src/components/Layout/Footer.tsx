import React from 'react';
import { Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>© {currentYear} Manya Shukla. All rights reserved.</p>
        <div className="social-links">
          <a 
            href="https://www.linkedin.com/in/manya-shukla99/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={20} />
            LinkedIn
          </a>
          <a 
            href="https://github.com/MANYA-SHUKLA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;