import React from 'react';
import { useEffect, useRef } from 'react';
import { HackerRankIcon, WhatsappIcon, GithubIcon, LinkedInIcon } from '../components/SocialIcons';

const Home: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let hasAnimated = false;
    
    // Animate title text only when it becomes visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated && titleRef.current) {
          hasAnimated = true;
          import('gsap').then(({ gsap }) => {
            const tl = gsap.timeline();
            tl.from(titleRef.current!.children, {
              opacity: 0,
              y: 30,
              stagger: 0.2,
              duration: 0.8,
              ease: "power3.out"
            });
          });
        }
      });
    }, { threshold: 0.1 });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    // Animate photo container
    if (containerRef.current) {
      import('gsap').then(({ gsap }) => {
      gsap.from(containerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)"
        });
      });
    }

    // Animate social icons
    if (socialRef.current) {
      import('gsap').then(({ gsap }) => {
      gsap.from(socialRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1.2,
        ease: "power3.out"
        });
      });
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative py-20 overflow-hidden grid-overlay">
      <div className="absolute inset-0 grid-overlay"></div>
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-3/5 mb-12 md:mb-0 text-center md:text-left">
          <p className="text-accent font-mono mb-3 tracking-widest animate-pulse">INITIALIZING INTERFACE</p>
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold leading-tight mb-4">
            <span className="block">I'm <span className="text-accent animate-glow">Dinesh Kumar Sahoo</span></span>
            <span className="block">Web Developer</span>
          </h1>
          <div className="line-animation mb-8 w-40 md:w-60"></div>
          <p className="text-lg text-gray-300 mb-8 max-w-lg">
            Computer Science student passionate about creating innovative web solutions with clean code and modern design principles.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
            <a href="#contact" className="neo-button bg-accent text-[#1A1A1A] px-8 py-3 rounded-sm font-mono font-bold tracking-wider hover:bg-opacity-90 shadow-neon transition-all duration-300">
              CONTACT ME
            </a>
            <a href="#projects" className="neo-button border border-accent text-accent px-8 py-3 rounded-sm font-mono tracking-wider hover:bg-accent hover:bg-opacity-10 transition-all duration-300">
              VIEW WORK
            </a>
          </div>
          
          {/* Social icons - moved below buttons */}
          <div ref={socialRef} className="flex gap-5 justify-center md:justify-start mt-2">
            <a 
              href="https://github.com/Dinesh69069" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center text-gray-300 hover:text-accent transition-colors"
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/dinesh-kumar-sahoo-183533330/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center text-gray-300 hover:text-accent transition-colors"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            
            <a 
              href="https://www.hackerrank.com/profile/dineshkumarcs001" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center text-gray-300 hover:text-accent transition-colors"
              title="HackerRank"
              aria-label="HackerRank"
            >
              <HackerRankIcon className="w-6 h-6" />
              <span className="sr-only">HackerRank</span>
            </a>
            
            <a 
              href="https://wa.me/918144252742" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center text-gray-300 hover:text-accent transition-colors"
              title="WhatsApp"
              aria-label="WhatsApp"
            >
              <WhatsappIcon className="w-6 h-6" />
              <span className="sr-only">WhatsApp</span>
            </a>
          </div>
        </div>
        
        <div ref={containerRef} className="w-full md:w-2/5 flex justify-center md:justify-end">
          <div className="glassmorphism relative rounded-full w-60 h-60 md:w-80 md:h-80 flex items-center justify-center animate-float">
            <div className="absolute inset-3 rounded-full border border-accent opacity-20 animate-spin-slow"></div>
            <div className="absolute inset-5 rounded-full border border-[#FF3366] opacity-20 animate-spin"></div>
            
            <div className="rounded-full overflow-hidden border-2 border-accent p-1 shadow-neon">
              {/* Profile photo with fallback paths */}
              <img 
                src={import.meta.env.BASE_URL + "profile.jpg"}
                alt="Dinesh Kumar Sahoo"
                className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover"
                width={256}
                height={256}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = import.meta.env.BASE_URL + "Profile_photo.jpg";
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <a href="#about" className="animate-bounce text-accent" aria-label="Scroll to About section">
          <i className="fa-solid fa-chevron-down text-2xl"></i>
          <span className="sr-only">Scroll to About section</span>
        </a>
      </div>
    </section>
  );
};

export default Home;
