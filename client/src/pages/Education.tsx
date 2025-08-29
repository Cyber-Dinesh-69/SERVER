import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { useEffect, useRef } from 'react';

const Education: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll('.glassmorphism');
      
      import('gsap').then(({ gsap }) => {
        gsap.fromTo(
          timelineItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }
  }, []);

  return (
    <section id="education" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeader 
          title="Education" 
          highlightedWord="Education" 
          description="My academic journey and educational background that formed the foundation of my technical skills."
        />
        
        <div ref={timelineRef} className="relative flex flex-col gap-8 max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/4 top-0 bottom-0 w-px bg-gray-700 -ml-px"></div>
          
          {/* Education */}
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold text-accent mb-8 text-center md:text-left">&lt;Education_Timeline /&gt;</h3>
            
            {/* Education Item 1 - Graduation */}
            <div className="flex">
              <div className="relative mr-8 md:mr-16">
                <div className="absolute top-1/2 left-2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-[#1A1A1A] border-2 border-accent z-10 flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-accent"></i>
                </div>
              </div>
              <div className="glassmorphism rounded-md p-6 flex-1">
                <div className="flex flex-col md:items-start">
                  <div className="bg-[#2D2D2D] inline-block px-3 py-1 rounded-sm text-xs font-mono text-accent mb-3">
                    2023 - 2027 (Expected)
                  </div>
                  <h4 className="text-xl font-bold mb-2">Bachelor of Science in Computer Science</h4>
                  <p className="text-gray-400 mb-3">Lakshya Institute of Technology, Bhubaneswar</p>
                  <div className="text-gray-300">
                    <p className="mb-2">Highlights:</p>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li>Gaining in-depth knowledge in programming, web development, and data structures.</li>
                      <li>Actively working on academic projects to build technical expertise.</li>
                      <li>Continuously learning and staying up-to-date with industry trends.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Education Item 2 - 12th */}
            <div className="flex">
              <div className="relative mr-8 md:mr-16">
                <div className="absolute top-1/2 left-2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-[#1A1A1A] border-2 border-[#FF3366] z-10 flex items-center justify-center">
                  <i className="fas fa-school text-[#FF3366]"></i>
                </div>
              </div>
              <div className="glassmorphism rounded-md p-6 flex-1">
                <div className="flex flex-col md:items-start">
                  <div className="bg-[#2D2D2D] inline-block px-3 py-1 rounded-sm text-xs font-mono text-[#FF3366] mb-3">
                    2022
                  </div>
                  <h4 className="text-xl font-bold mb-2">12th Board (Higher Secondary)</h4>
                  <p className="text-gray-400 mb-3">Triveni Academy Higher Secondary, Bhubaneswar</p>
                  <div className="text-gray-300">
                    <p className="mb-1">Percentage: 86%</p>
                    <p>Achievements: Excelled in Physics, Chemistry, and Mathematics.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Education Item 3 - 10th */}
            <div className="flex">
              <div className="relative mr-8 md:mr-16">
                <div className="absolute top-1/2 left-2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-[#1A1A1A] border-2 border-accent z-10 flex items-center justify-center">
                  <i className="fas fa-book text-accent"></i>
                </div>
              </div>
              <div className="glassmorphism rounded-md p-6 flex-1">
                <div className="flex flex-col md:items-start">
                  <div className="bg-[#2D2D2D] inline-block px-3 py-1 rounded-sm text-xs font-mono text-accent mb-3">
                    2022
                  </div>
                  <h4 className="text-xl font-bold mb-2">10th Board</h4>
                  <p className="text-gray-400 mb-3">Panchayat Ucha Bidyapitha, Kantiapashi</p>
                  <div className="text-gray-300">
                    <p className="mb-1">Percentage: 79%</p>
                    <p>Achievements: Successfully completed foundational education with strong performance in Mathematics and Science.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
