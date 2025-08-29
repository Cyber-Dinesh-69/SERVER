import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import BackToTop from '../components/BackToTop';
import Home from './Home';
import About from './About';
import Education from './Education';
import Projects from './Projects';
import Achievements from './Achievements';
import Contact from './Contact';
import { useAnimations } from '../hooks/useAnimations';
import { HackerRankIcon, WhatsappIcon, GithubIcon, LinkedInIcon } from '../components/SocialIcons';

const Portfolio: React.FC = () => {
  useAnimations();
  
  useEffect(() => {
    // Load Font Awesome
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Home />
      <About />
      <Education />
      <Projects />
      <Achievements />
      <Contact />
      
      <footer className="py-12 border-t border-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <a href="#home" className="text-2xl font-bold flex items-center space-x-2">
                <span className="text-accent">∆</span>
                <span className="tracking-wider">DINESH</span>
              </a>
              <p className="text-gray-400 mt-2">Learning, coding, creating - one step at a time.</p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">&copy; {new Date().getFullYear()} Dinesh Kumar Sahoo. All rights reserved.</p>
              <div className="flex space-x-6 mt-3 justify-center md:justify-end">
                <a href="https://github.com/Dinesh69069" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors flex items-center" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                  <span className="sr-only">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/dinesh-kumar-sahoo-dinesh-kumar-sahoo-183533330/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors flex items-center" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="https://www.hackerrank.com/profile/dineshkumarcs001" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors flex items-center" aria-label="HackerRank">
                  <i className="fab fa-hackerrank"></i>
                  <span className="sr-only">HackerRank</span>
                </a>
                <a href="https://wa.me/918144252742" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors flex items-center" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                  <span className="sr-only">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Grid Effect */}
        <div className="absolute inset-0 grid-overlay opacity-50"></div>
      </footer>
      
      <BackToTop />
    </div>
  );
};

export default Portfolio;
