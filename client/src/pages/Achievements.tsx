import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { useEffect, useRef, useState } from 'react';

// Real certificates from the provided files
const certifications = [
  {
    id: 1,
    title: "HTML Fundamentals",
    organization: "Luminus Learning",
    year: "2024",
    icon: "html5",
    description: "Certification in HTML fundamentals including semantic markup, forms, and accessibility. This certification validates my ability to create well-structured, accessible web pages using modern HTML5 standards.",
    skills: ["Semantic HTML", "Forms & Validation", "Accessibility", "Document Structure"],
    image: "/PERSONAL-CYBER-PORTFOLIO/CERTIFICATES/HTML - Lomus Learning.pdf"
  },
  {
    id: 2,
    title: "Python Programming (Basic)",
    organization: "HackerRank",
    year: "2024",
    icon: "python",
    description: "Verified skills in Python programming fundamentals, including data structures and functions. This certification confirms my proficiency in writing efficient Python code and solving problems using Python's powerful libraries.",
    skills: ["Data Structures", "Functions", "Error Handling", "File I/O"],
    image: "/PERSONAL-CYBER-PORTFOLIO/CERTIFICATES/Python (Basic) - Hacker Rank.pdf"
  },
  {
    id: 3,
    title: "SQL Database",
    organization: "Simplilearn",
    year: "2024",
    icon: "database",
    iconType: "solid",
    description: "Certification in SQL queries, data manipulation, and database management. This credential demonstrates my ability to design, query, and manage relational databases effectively.",
    skills: ["CRUD Operations", "Joins & Subqueries", "Indexing", "Database Design"],
    image: "/PERSONAL-CYBER-PORTFOLIO/CERTIFICATES/SQL - SimpliLearn.pdf"
  },
  {
    id: 4,
    title: "CSS (Basic)",
    organization: "HackerRank",
    year: "2024",
    icon: "css3-alt",
    description: "Certified skills in CSS styling, selectors, and responsive design principles. This certification validates my ability to create visually appealing, responsive layouts using modern CSS techniques.",
    skills: ["Flexbox & Grid", "Media Queries", "Animations", "CSS Variables"],
    image: "/PERSONAL-CYBER-PORTFOLIO/CERTIFICATES/CSS (Basic) - Hacker Rank.pdf"
  },
  {
    id: 5,
    title: "C Programming (Basic)",
    organization: "Simplilearn",
    year: "2024",
    icon: "terminal",
    iconType: "solid",
    description: "Verification of foundational C programming skills including memory management and structures. This certification confirms my understanding of low-level programming concepts and efficient memory usage.",
    skills: ["Memory Management", "Pointers", "Structures", "File Operations"],
    image: "/PERSONAL-CYBER-PORTFOLIO/CERTIFICATES/C (Basic) - SimpliLearn.pdf"
  },
  {
    id: 6,
    title: "Business Intelligence",
    organization: "Microsoft",
    year: "2024",
    icon: "microsoft",
    description: "Certification in business intelligence concepts, data visualization, and analytics. This credential demonstrates my ability to transform raw data into actionable insights through effective visualization and analysis techniques.",
    skills: ["Data Visualization", "KPI Tracking", "Dashboard Design", "Data Modeling"],
    image: "/PERSONAL-CYBER-PORTFOLIO/CERTIFICATES/BI Certificate - Microsoft.pdf"
  },
  {
    id: 7,
    title: "JavaScript (Basic)",
    organization: "Sololearn",
    year: "2024",
    icon: "js",
    description: "Certification in JavaScript fundamentals including variables, functions, and DOM manipulation. This certification validates my ability to create interactive web applications using modern JavaScript.",
    skills: ["Variables & Data Types", "Functions", "DOM Manipulation", "Event Handling"],
    image: "/PERSONAL-CYBER-PORTFOLIO/CERTIFICATES/JavaScript (Basic) - Sololearn.pdf"
  },
  {
    id: 8,
    title: "Introduction to Data Analytics",
    organization: "LinkedIn Learning",
    year: "2024",
    icon: "chart-line",
    iconType: "solid",
    description: "Certification in data analytics fundamentals, including data visualization and statistical analysis. This credential demonstrates my ability to analyze and interpret data effectively.",
    skills: ["Data Analysis", "Statistical Methods", "Data Visualization", "Business Intelligence"],
    image: "/PERSONAL-CYBER-PORTFOLIO/CERTIFICATES/Introduction to Data Analytics (Linked-In Learning).pdf"
  },
  {
    id: 9,
    title: "C Intermediate",
    organization: "Sololearn",
    year: "2024",
    icon: "code",
    iconType: "solid",
    description: "Advanced C programming certification covering intermediate concepts and advanced programming techniques. This certification demonstrates my proficiency in complex C programming concepts.",
    skills: ["Advanced Pointers", "Memory Management", "Data Structures", "File I/O"],
    image: "/PERSONAL-CYBER-PORTFOLIO/CERTIFICATES/C Intermediate - Sololearn.pdf"
  },
  {
    id: 10,
    title: "Technology Consulting",
    organization: "Deloitte",
    year: "2024",
    icon: "building",
    iconType: "solid",
    description: "Certification in technology consulting principles and methodologies. This credential demonstrates my understanding of technology consulting practices and business technology solutions.",
    skills: ["Technology Consulting", "Business Analysis", "Solution Design", "Client Management"],
    image: "/PERSONAL-CYBER-PORTFOLIO/CERTIFICATES/Tecnology - Deloitte.pdf"
  },
  {
    id: 11,
    title: "Cybersecurity Fundamentals",
    organization: "Deloitte",
    year: "2024",
    icon: "shield-alt",
    iconType: "solid",
    description: "Certification in cybersecurity fundamentals and best practices. This credential demonstrates my understanding of cybersecurity principles and security measures.",
    skills: ["Cybersecurity", "Security Best Practices", "Risk Assessment", "Security Protocols"],
    image: "/PERSONAL-CYBER-PORTFOLIO/CERTIFICATES/Cyber - Deloitte.pdf"
  },
  {
    id: 12,
    title: "SQL (Basic)",
    organization: "HackerRank",
    year: "2024",
    icon: "database",
    iconType: "solid",
    description: "Basic SQL certification covering fundamental database querying and manipulation skills. This certification validates my ability to work with relational databases.",
    skills: ["SQL Queries", "Data Retrieval", "Table Operations", "Basic Joins"],
    image: "/PERSONAL-CYBER-PORTFOLIO/CERTIFICATES/SQL (Basic) - Hacker Rank.pdf"
  },
  {
    id: 13,
    title: "HTML Fundamentals",
    organization: "Sololearn",
    year: "2024",
    icon: "html5",
    description: "Comprehensive HTML certification covering modern web development standards. This certification validates my expertise in creating well-structured web content.",
    skills: ["HTML5", "Semantic Markup", "Forms", "Web Standards"],
    image: "/PERSONAL-CYBER-PORTFOLIO/CERTIFICATES/HTML - (SoloLearn).pdf"
  }
];

const Achievements: React.FC = () => {
  const certificatesRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    // Animate certificates
    if (certificatesRef.current) {
      import('gsap').then(({ gsap }) => {
        const certificateElements = certificatesRef.current?.querySelectorAll('.glassmorphism');
        if (certificateElements) {
          gsap.fromTo(
            certificateElements,
            { 
              opacity: 0, 
              scale: 0.9
            },
            {
              opacity: 1,
              scale: 1,
              stagger: 0.1,
              duration: 0.6,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: certificatesRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });
    }
  }, []);

  const openCertificateModal = (cert: typeof certifications[0]) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const closeCertificateModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="achievements" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeader 
          title="Certifications" 
          highlightedWord="Certifications" 
          description="Technical certifications and courses I've completed to enhance my skills and knowledge."
        />
        
        <div className="max-w-6xl mx-auto">
          {/* Certifications */}
          <div ref={certificatesRef} className="w-full">
            <h3 className="text-2xl font-bold text-accent mb-8 text-center">&lt;Technical_Certifications /&gt;</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="glassmorphism rounded-md overflow-hidden group hover:shadow-neon transition-all duration-300">
                  <div className="relative h-48 overflow-hidden bg-[#2D2D2D] flex items-center justify-center">
                    <i className={`fa${cert.iconType ? 's' : 'b'} fa-${cert.icon} text-7xl text-accent opacity-30`}></i>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-60"></div>
                    <div className="absolute top-4 right-4 bg-[#2D2D2D] px-2 py-1 rounded-sm text-xs font-mono text-[#FF3366]">
                      {cert.year}
                    </div>
                    
                    {/* Organization badge */}
                    <div className="absolute bottom-4 left-4 bg-[#2D2D2D] px-3 py-1 rounded-sm text-xs font-mono flex items-center">
                      <i className="fas fa-award text-accent mr-2"></i>
                      <span>{cert.organization}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">{cert.title}</h4>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{cert.description}</p>
                    
                    {/* Skills badges */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {cert.skills.slice(0, 2).map((skill, idx) => (
                        <span key={idx} className="bg-[#2D2D2D] text-xs px-2 py-1 rounded text-gray-300">
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 2 && (
                        <span className="bg-[#2D2D2D] text-xs px-2 py-1 rounded text-accent">
                          +{cert.skills.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <button
                        onClick={() => openCertificateModal(cert)}
                        className="text-accent text-sm underline hover:text-white transition-colors flex items-center"
                      >
                        <i className="fas fa-search mr-1"></i> Preview
                      </button>
                      <a 
                        href={cert.image} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="neo-button text-accent text-sm px-4 py-2 border border-accent rounded-sm flex items-center hover:bg-accent hover:bg-opacity-10 transition-all"
                        aria-label={cert.title}
                      >
                        <i className="fas fa-file-pdf mr-2"></i>
                        <span>View Certificate</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <div className="glassmorphism inline-block px-6 py-4 rounded-md mx-auto">
                <p className="text-gray-300 mb-4">
                  <i className="fas fa-lightbulb text-[#FF3366] mr-2"></i>
                  <span>Continuously expanding my knowledge through online courses and certifications.</span>
                </p>
                <p className="text-gray-400 text-sm">
                  I believe in lifelong learning and keeping up with the latest technologies and best practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {isModalOpen && selectedCert && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white">{selectedCert.title}</h3>
              <button 
                onClick={closeCertificateModal}
                className="text-gray-400 hover:text-white"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-6 grid md:grid-cols-12 gap-6">
              <div className="md:col-span-5">
                <div className="mb-4">
                  <h4 className="text-sm uppercase text-gray-500 mb-1">Organization</h4>
                  <p className="flex items-center text-white">
                    <i className="fas fa-award text-accent mr-2"></i>
                    {selectedCert.organization}
                  </p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm uppercase text-gray-500 mb-1">Year Completed</h4>
                  <p className="text-white">{selectedCert.year}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm uppercase text-gray-500 mb-1">Description</h4>
                  <p className="text-gray-300 text-sm">{selectedCert.description}</p>
                </div>
                
                <div>
                  <h4 className="text-sm uppercase text-gray-500 mb-1">Skills Verified</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCert.skills.map((skill, idx) => (
                      <span key={idx} className="bg-[#2D2D2D] text-xs px-2 py-1 rounded text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-7">
                <div className="rounded-lg overflow-hidden bg-[#2D2D2D] h-full flex flex-col items-center justify-center p-4">
                  {/* Certificate Preview Container */}
                  <div className="w-full h-[400px] flex flex-col items-center justify-center">
                    <div className="bg-[#1A1A1A] p-8 rounded-lg text-center w-full">
                      <i className={`fa${selectedCert.iconType ? 's' : 'b'} fa-${selectedCert.icon} text-8xl text-accent mb-4`}></i>
                      <h3 className="text-xl font-bold text-white mb-2">{selectedCert.title}</h3>
                      <p className="text-gray-400 mb-4">Issued by {selectedCert.organization}</p>
                      
                      {/* View Options */}
                      <div className="flex flex-col gap-3 mt-6">
              <a 
                href={selectedCert.image} 
                target="_blank" 
                rel="noopener noreferrer" 
                          className="neo-button bg-accent text-white px-6 py-3 rounded-sm flex items-center justify-center hover:bg-opacity-90 transition-all"
                          aria-label={selectedCert.title}
                        >
                          <i className="fas fa-external-link-alt mr-2"></i>
                          <span>View Full Certificate</span>
                        </a>
                        
                        <a 
                          href={selectedCert.image}
                          download
                          className="neo-button border border-accent text-accent px-6 py-3 rounded-sm flex items-center justify-center hover:bg-accent hover:bg-opacity-10 transition-all"
                          aria-label={selectedCert.title}
              >
                <i className="fas fa-download mr-2"></i>
                <span>Download Certificate</span>
              </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;
