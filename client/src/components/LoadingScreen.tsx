import React, { useEffect, useState, useRef } from 'react';

const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("INITIALIZING SYSTEMS");
  const [progress, setProgress] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Text sequence for cyberpunk boot sequence
    const textSequence = [
      "INITIALIZING SYSTEMS",
      "SCANNING NEURAL NETWORK",
      "ACTIVATING QUANTUM PROCESSORS",
      "ESTABLISHING SECURE CONNECTION",
      "UNLOCKING ENCRYPTED DATA CHANNELS",
      "OPTIMIZING CYBERSPACE INTERFACE",
      "PORTFOLIO SYSTEMS ONLINE"
    ];
    
    // Boot log lines
    const bootLogSequence = [
      "KERNEL LOADED >> cybershell.v4.1",
      "INITIALIZING OPTICS MODULE >> res=3840x2160",
      "LOADING MEMORY BANKS >> 128 TiB OK",
      "NEURAL PROCESSING UNIT >> ONLINE",
      "QUANTUM CO-PROCESSOR >> ONLINE",
      "TACTICAL ANALYSIS MODULE >> READY",
      "BIOMETRIC SCANNING >> ENABLED",
      "VOICE RECOGNITION >> CALIBRATED",
      "COMBAT SYSTEMS >> STANDBY",
      "AUTONOMY PROTOCOLS >> AUTHORIZED",
      "DEFENSE SYSTEMS >> ACTIVE",
      "SECURE COMMUNICATIONS >> ENCRYPTED",
      "PRIMARY DIRECTIVE >> PROTECT DINESH",
      "SECONDARY DIRECTIVE >> PORTFOLIO PRESENTATION",
      "TERTIARY DIRECTIVE >> IMPRESS VIEWERS",
      "ALL SYSTEMS >> NOMINAL"
    ];
    
    // Create cyberpunk-style loading sequence with GSAP
    let mainTl: any;
    
    // Initial glitch/boot effect
    import('gsap').then(({ gsap }) => {
      mainTl = gsap.timeline();
      mainTl.to('.loading-screen', {
        opacity: 0.5,
        duration: 0.05,
        repeat: 8,
        yoyo: true
      });
      
      // Add boot log lines
      const addBootLine = (index: number) => {
        if (index < bootLogSequence.length) {
          setBootLines(prev => [...prev, bootLogSequence[index]]);
          // Auto-scroll terminal
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
        }
      };
      
      // Add initial boot lines faster
      for (let i = 0; i < 3; i++) {
        mainTl.call(() => addBootLine(i), [], i * 0.2);
      }
      
      // Animate the robotic parts with cooler entrances
      mainTl.fromTo('.robot-head', 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1.2, 0.5)" }
      );
      
      mainTl.fromTo('.robot-part', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );
      
      // Continue adding boot lines
      for (let i = 3; i < bootLogSequence.length; i++) {
        mainTl.call(() => addBootLine(i), [], 1.5 + (i - 3) * 0.15);
      }
      
      // Animate the progress bar and text changes
      textSequence.forEach((text, index) => {
        // Update text and progress in sequence
        mainTl.call(() => {
          setLoadingText(text);
          setProgress(Math.floor((index + 1) / textSequence.length * 100));
        }, [], 1 + index * 0.9);
        
        // Add scanning line effect
        if (index < textSequence.length - 1) {
          mainTl.fromTo('.scan-line',
            { top: '0%', opacity: 0.7 },
            { top: '100%', opacity: 0, duration: 0.8, ease: "power1.inOut" },
            1 + index * 0.9 + 0.1
          );
        }
      });
      
      // Eye scanning effects
      mainTl.to('.robot-eye-inner', {
        boxShadow: '0 0 25px 8px #00FFB2',
        background: 'rgba(0, 255, 178, 0.9)',
        repeat: 3,
        yoyo: true,
        duration: 0.3
      }, 3);
      
      // Mouth analyzer animation
      mainTl.to('.mouth-bar', {
        height: (i) => (Math.random() * 12) + 2 + 'px',
        stagger: { each: 0.05, repeat: 8, yoyo: true },
        duration: 0.2,
      }, 3);
      
      // Final HUD elements
      mainTl.fromTo('.hud-element',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.4 },
        4
      );
      
      // Final reveal animation
      mainTl.to('.loading-screen', {
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
        onComplete: () => {
          setLoading(false);
        }
      }, "+=1.5");
    });
    
    return () => {
      mainTl.kill();
    };
  }, []);
  
  if (!loading) return null;
  
  return (
    <div className="loading-screen fixed inset-0 bg-[#0F0F12] z-[9999] flex flex-col items-center justify-center overflow-hidden">
      {/* Scan line effect */}
      <div className="scan-line absolute left-0 w-full h-2 bg-accent opacity-50"></div>
      
      {/* Matrix-like grid background */}
      <div className="absolute inset-0 grid-overlay opacity-20"></div>
      
      {/* HUD elements */}
      <div className="hud-element absolute top-6 left-6 text-xs text-accent font-mono border border-accent py-1 px-3 rounded-sm">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse mr-2"></div>
          <span>QUANTUM CORE: ACTIVE</span>
        </div>
      </div>
      
      <div className="hud-element absolute top-6 right-6 text-xs text-[#FF3366] font-mono border border-[#FF3366] py-1 px-3 rounded-sm">
        <div className="flex items-center">
          <span>DEFENSE PROTOCOL DELTA</span>
          <div className="w-2 h-2 rounded-full bg-[#FF3366] animate-ping ml-2"></div>
        </div>
      </div>
      
      <div className="hud-element absolute bottom-6 left-6 text-xs text-accent font-mono">
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
            <span>SYSTEM: T-800 CYBERDYNE</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#FF3366] mr-2"></div>
            <span>DINESH.OS v4.21.2025</span>
          </div>
        </div>
      </div>
      
      <div className="hud-element absolute bottom-6 right-6 text-xs text-[#FF3366] font-mono">
        <div className="flex flex-col items-end">
          <div className="flex items-center mb-1">
            <span>LOCATION: SECURED</span>
            <div className="w-2 h-2 rounded-full bg-[#FF3366] ml-2"></div>
          </div>
          <div className="flex items-center">
            <span>LAT: 20.2961° N LON: 85.8245° E</span>
            <div className="w-2 h-2 rounded-full bg-accent ml-2"></div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl gap-8 px-4 z-10">
        {/* Transformer robot face - enhanced version */}
        <div className="robot-head relative w-64 h-64 md:w-80 md:h-80">
          {/* Robot head outline with neon glow */}
          <div className="robot-part absolute inset-0 border-2 border-accent rounded-lg transform rotate-3 shadow-[0_0_15px_rgba(0,255,178,0.3)]"></div>
          <div className="robot-part absolute inset-0 border-2 border-[#FF3366] rounded-lg transform -rotate-3 scale-95 shadow-[0_0_15px_rgba(255,51,102,0.3)]"></div>
          
          {/* Circuit patterns on the face */}
          <div className="robot-part absolute inset-10 opacity-30">
            <div className="absolute top-0 left-0 w-16 h-px bg-accent"></div>
            <div className="absolute top-0 left-0 w-px h-16 bg-accent"></div>
            <div className="absolute top-0 right-0 w-16 h-px bg-[#FF3366]"></div>
            <div className="absolute top-0 right-0 w-px h-16 bg-[#FF3366]"></div>
            <div className="absolute bottom-0 left-0 w-16 h-px bg-[#FF3366]"></div>
            <div className="absolute bottom-0 left-0 w-px h-16 bg-[#FF3366]"></div>
            <div className="absolute bottom-0 right-0 w-16 h-px bg-accent"></div>
            <div className="absolute bottom-0 right-0 w-px h-16 bg-accent"></div>
          </div>
          
          {/* Robot eyes - more advanced with inner mechanism */}
          <div className="flex justify-between px-10 pt-12">
            <div className="robot-part robot-eye w-16 h-12 bg-[#0D0D0D] border-2 border-accent rounded-sm flex items-center justify-center overflow-hidden shadow-[0_0_10px_rgba(0,255,178,0.5)]">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 scanline-effect opacity-40"></div>
                <div className="robot-eye-inner w-10 h-6 bg-accent opacity-70 rounded-sm flex items-center justify-center relative">
                  {/* Inner eye mechanism */}
                  <div className="absolute inset-1 bg-[#0D0D0D] rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute w-full h-px bg-white opacity-50 animate-[scan_1.5s_infinite]"></div>
                </div>
              </div>
            </div>
            <div className="robot-part robot-eye w-16 h-12 bg-[#0D0D0D] border-2 border-accent rounded-sm flex items-center justify-center overflow-hidden shadow-[0_0_10px_rgba(0,255,178,0.5)]">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 scanline-effect opacity-40"></div>
                <div className="robot-eye-inner w-10 h-6 bg-accent opacity-70 rounded-sm flex items-center justify-center relative">
                  <div className="absolute inset-1 bg-[#0D0D0D] rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute w-full h-px bg-white opacity-50 animate-[scan_1.5s_infinite_0.75s]"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Robot mouth/analyzer - more reactive */}
          <div className="robot-part absolute bottom-20 left-1/2 transform -translate-x-1/2 w-40 h-12 bg-[#0D0D0D] border border-[#FF3366] rounded-sm overflow-hidden shadow-[0_0_10px_rgba(255,51,102,0.3)]">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 scanline-effect opacity-30"></div>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full flex justify-between px-2">
                  {[...Array(14)].map((_, i) => (
                    <div key={i} className="mouth-bar w-1 bg-[#FF3366] opacity-80" style={{height: `${2 + Math.random() * 8}px`}}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Robot mechanical details - enhanced with glowing effects */}
          <div className="robot-part absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-6 border border-accent flex shadow-[0_0_8px_rgba(0,255,178,0.3)]">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex-1 border-r border-accent relative overflow-hidden">
                <div className={`h-full ${i % 2 === 0 ? 'bg-accent' : 'bg-[#FF3366]'} opacity-30`}></div>
                <div className="absolute inset-0 scanline-effect"></div>
              </div>
            ))}
          </div>
          
          {/* Antenna - enhanced with pulsing effect */}
          <div className="robot-part absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-10 bg-accent shadow-[0_0_8px_rgba(0,255,178,0.5)]"></div>
          <div className="robot-part absolute top-0 left-1/2 transform -translate-x-1/2 -mt-2 w-4 h-2 bg-[#FF3366] rounded-full animate-pulse shadow-[0_0_8px_rgba(255,51,102,0.5)]"></div>
          
          {/* Targeting reticle animations */}
          <div className="robot-part absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full absolute opacity-30">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-accent transform -translate-y-1/2"></div>
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-accent transform -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-[#FF3366] rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping-slow opacity-20"></div>
            </div>
          </div>
        </div>
        
        {/* Terminal and status display - enhanced with scrolling text */}
        <div className="flex flex-col w-full max-w-md">
          {/* Loading text and progress */}
          <div className="text-center relative z-10 glassmorphism py-4 px-8 rounded-md mb-4 border border-accent/20">
            <h1 className="text-2xl font-bold mb-3 font-mono tracking-wider">
              <span className="text-accent">{loadingText}</span>
              <span className="animate-pulse ml-1">_</span>
            </h1>
            
            <div className="w-full mb-3 relative">
              <div className="w-full h-2 bg-[#2D2D2D] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-[#FF3366]" 
                  style={{ width: `${progress}%`, transition: 'width 0.5s ease-out' }}
                ></div>
                
                {/* Progress segments */}
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute top-0 bottom-0 w-px bg-[#1A1A1A]" 
                    style={{ left: `${i * 5}%` }}
                  ></div>
                ))}
              </div>
              <div className="text-[#FF3366] text-xs font-mono text-right mt-1">
                {progress}% COMPLETE
              </div>
            </div>
            
            <div className="font-mono text-sm text-gray-400 flex justify-between items-center">
              <div>STATUS: <span className="text-accent">ONLINE</span></div>
              <div className="text-[#FF3366] animate-pulse">[AUTONOMOUS MODE]</div>
            </div>
          </div>
          
          {/* Boot log terminal */}
          <div 
            ref={terminalRef}
            className="robot-part glassmorphism bg-[#0A0A0A]/90 border border-accent/30 rounded-md p-4 h-48 overflow-y-auto text-xs font-mono relative"
          >
            {/* Terminal header */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-[#1A1A1A] flex items-center px-2">
              <div className="w-2 h-2 rounded-full bg-[#FF3366] mr-1"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-xs ml-2 text-gray-400">cyberdyne_os.exe</span>
            </div>
            
            <div className="mt-6 space-y-1">
              {bootLines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="text-accent mr-2">[{(0x8000 + index * 0x10).toString(16).toUpperCase()}]</span>
                  <span className="text-gray-300">{line}</span>
                </div>
              ))}
              <div className="text-gray-300 animate-pulse">_</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rotating circular elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-accent opacity-10 animate-spin-slow"></div>
        <div className="w-[400px] h-[400px] rounded-full border border-[#FF3366] opacity-10 animate-spin" style={{animationDirection: 'reverse'}}></div>
        <div className="w-[300px] h-[300px] rounded-full border border-accent opacity-5 animate-spin-slow" style={{animationDuration: '15s'}}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;