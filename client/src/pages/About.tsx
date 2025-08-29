import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { useEffect, useRef } from 'react';

const About: React.FC = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate skill bars when they come into view
    const skills = [
      { name: "HTML", percentage: 100 },
      { name: "CSS", percentage: 60 },
      { name: "JavaScript", percentage: 40 },
      { name: "C", percentage: 80 },
      { name: "Python", percentage: 75 },
      { name: "SQL", percentage: 85 }
    ];

    if (skillsRef.current) {
      const progressBars = skillsRef.current.querySelectorAll('.progress-fill');
      
      import('gsap').then(({ gsap }) => {
        progressBars.forEach((bar, index) => {
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: `${skills[index].percentage}%`,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 90%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      });
    }
  }, []);

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeader 
          title="About Me" 
          highlightedWord="Me" 
          description="A passionate computer science student with a focus on web development and programming fundamentals."
        />
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2">
            <div className="glassmorphism rounded-md p-6 h-full">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-accent">&lt;Personal_Brief /&gt;</h3>
                <div className="text-xs text-gray-400 font-mono border border-gray-700 px-2 py-1 rounded">
                  <i className="fas fa-code mr-1"></i> VERSION 1.0
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">
                I am a dedicated Computer Science student with a strong foundation in programming fundamentals and web development. 
                Currently pursuing my Bachelor's degree at Lakshya Institute of Technology, I am passionate about creating 
                innovative digital solutions and continuously expanding my technical skills.
              </p>
              
              <p className="text-gray-300 mb-8">
                My academic focus includes web technologies, data structures, and problem-solving. I approach each project 
                with enthusiasm and a commitment to learning, aiming to build a strong foundation for my future career in 
                software development.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-sm text-gray-400 mb-1">Name:</p>
                  <p className="font-medium">Dinesh Kumar Sahoo</p>
                </div>
                <div>
                  <p className="font-mono text-sm text-gray-400 mb-1">Email:</p>
                  <p className="font-medium">dineshkumarcs0014@gmail.com</p>
                </div>
                <div>
                  <p className="font-mono text-sm text-gray-400 mb-1">Location:</p>
                  <p className="font-medium">Bhubaneswar, India</p>
                </div>
                <div>
                  <p className="font-mono text-sm text-gray-400 mb-1">Status:</p>
                  <p className="font-medium text-accent">Computer Science Student</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="glassmorphism rounded-md p-6">
              <h3 className="text-2xl font-bold text-accent mb-6">&lt;Skills /&gt;</h3>
              
              <div ref={skillsRef} className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono">HTML</span>
                    <span className="text-accent">100%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill bg-accent" data-width="100%"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono">CSS</span>
                    <span className="text-accent">60%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill bg-accent" data-width="60%"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono">JavaScript</span>
                    <span className="text-accent">40%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill bg-accent" data-width="40%"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono">C</span>
                    <span className="text-accent">80%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill bg-accent" data-width="80%"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono">Python</span>
                    <span className="text-accent">75%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill bg-accent" data-width="75%"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono">SQL</span>
                    <span className="text-accent">85%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill bg-accent" data-width="85%"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-4 text-lg">Tech Stack</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-[#2D2D2D] px-3 py-1 rounded-sm text-sm font-mono">HTML</span>
                  <span className="bg-[#2D2D2D] px-3 py-1 rounded-sm text-sm font-mono">CSS</span>
                  <span className="bg-[#2D2D2D] px-3 py-1 rounded-sm text-sm font-mono">JavaScript</span>
                  <span className="bg-[#2D2D2D] px-3 py-1 rounded-sm text-sm font-mono">C</span>
                  <span className="bg-[#2D2D2D] px-3 py-1 rounded-sm text-sm font-mono">Python</span>
                  <span className="bg-[#2D2D2D] px-3 py-1 rounded-sm text-sm font-mono">SQL</span>
                  <span className="bg-[#2D2D2D] px-3 py-1 rounded-sm text-sm font-mono">Git</span>
                  <span className="bg-[#2D2D2D] px-3 py-1 rounded-sm text-sm font-mono">Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
