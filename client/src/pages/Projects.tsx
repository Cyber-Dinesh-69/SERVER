import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useEffect, useRef } from 'react';

// Use Vite base path so assets work in dev and prod
const basePath = import.meta.env.BASE_URL;
const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A responsive portfolio website with clean design showcasing my skills and projects.",
    image: `${basePath}assets/images/projects/01_Portfolio.png`,
    category: "FRONTEND",
    categoryColor: "accent",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    links: {
      github: "https://github.com/Dinesh69069/DINESH-KUMAR-SAHOO",
      live: "https://dinesh69069.github.io/DINESH-KUMAR-SAHOO/"
    }
  },
  {
    id: 2,
    title: "Car Animation Project",
    description: "An interactive car animation with dynamic movement effects and user controls.",
    image: `${basePath}assets/images/projects/02_Car_animation.png`,
    category: "ANIMATION",
    categoryColor: "highlight",
    technologies: ["HTML", "CSS", "JavaScript", "Animation", "SVG"],
    links: {
      github: "https://github.com/Dinesh69069/CAR-ANIMATION",
      live: "https://dinesh69069.github.io/CAR-ANIMATION/"
    }
  },
  {
    id: 3,
    title: "Restaurant Menu",
    description: "A digital restaurant menu with elegant design and interactive category filtering.",
    image: `${basePath}assets/images/projects/03_Resturant_menu.png`,
    category: "FRONTEND",
    categoryColor: "accent",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    links: {
      github: "https://github.com/Dinesh69069/RESTURANT",
      live: "https://dinesh69069.github.io/RESTURANT/"
    }
  },
  {
    id: 4,
    title: "Cyber Portfolio",
    description: "A cyberpunk-themed portfolio website with advanced animations and futuristic UI elements.",
    image: `${basePath}assets/images/projects/04_Modifoed_Cyber_ Portfolio.png`,
    category: "FRONTEND",
    categoryColor: "highlight",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP", "SVG Animation"],
    links: {
      github: "https://github.com/Dinesh69069",
      live: "#"
    }
  }
];

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const filters = ["All", "Frontend", "Animation"];
  
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => 
          project.category.toUpperCase().includes(activeFilter.toUpperCase())
        )
      );
    }
    
    // Animate the cards when they change
    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll('.project-card');
      // Dynamically import gsap only when needed
      import('gsap').then(({ gsap }) => {
        gsap.fromTo(
          cards,
          { 
            opacity: 0, 
            y: 20,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(1.2)",
            clearProps: "all"
          }
        );
      });
    }
  }, [activeFilter]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "FRONTEND": return "bg-accent";
      case "ANIMATION": return "bg-[#FF3366]";
      default: return "bg-accent";
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeader 
          title="Web Projects" 
          highlightedWord="Projects" 
          description="A showcase of my web development skills through these front-end projects."
        />
        
        {/* Project Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter, index) => (
            <button 
              key={index}
              className={`px-5 py-2 rounded-sm font-mono text-sm bg-[#2D2D2D] ${
                activeFilter === filter 
                  ? "text-accent border border-accent" 
                  : "text-gray-300 hover:text-accent transition-colors"
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-card glassmorphism rounded-md overflow-hidden group transition-all duration-300 hover:shadow-neon relative"
            >
              <div className="relative overflow-hidden h-52">
                {/* Display actual project image */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-top"
                  width={416}
                  height={208}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-80 hover:opacity-40 transition-opacity duration-300"></div>
                <div className={`absolute top-4 right-4 ${getCategoryColor(project.category)} text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-sm`}>
                  {project.category}
                </div>
              </div>
              
              <div className="p-6 relative">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="text-xs bg-[#2D2D2D] px-2 py-1 rounded-sm font-mono">{tech}</span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  {project.links.live === "#" ? (
                    <span className="text-accent text-sm flex items-center" aria-label="Project in development">
                      <span>In Development</span>
                      <i className="fas fa-code-branch ml-2 text-xs"></i>
                    </span>
                  ) : (
                    <span className="text-accent text-sm flex items-center">
                      <i className="fas fa-check-circle mr-2"></i>
                      <span>Completed</span>
                    </span>
                  )}
                  <div className="flex gap-3">
                    {project.links.github !== "#" && (
                      <a 
                        href={project.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-accent transition-colors inline-block p-2 hover:bg-[#2D2D2D] rounded cursor-pointer z-10" 
                        aria-label={`View ${project.title} on GitHub`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="fab fa-github text-xl"></i>
                        <span className="sr-only">GitHub</span>
                      </a>
                    )}
                    {project.links.live !== "#" && (
                      <a 
                        href={project.links.live} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-accent transition-colors inline-block p-2 hover:bg-[#2D2D2D] rounded cursor-pointer z-10" 
                        aria-label={`View live demo of ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="fas fa-external-link-alt text-xl"></i>
                        <span className="sr-only">Live project</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Project highlight border animation */}
              <div className="absolute inset-0 border border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="glassmorphism inline-block px-6 py-4 rounded-md mx-auto max-w-2xl">
            <p className="text-gray-300 mb-2">
              <i className="fas fa-info-circle text-[#FF3366] mr-2"></i>
              <span>These projects were developed as part of my learning journey.</span>
            </p>
            <p className="text-gray-400 text-sm">
              I am continuously improving my skills and adding new projects to my portfolio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
