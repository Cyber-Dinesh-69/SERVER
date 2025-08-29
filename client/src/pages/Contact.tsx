import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { HackerRankIcon, WhatsappIcon, GithubIcon, LinkedInIcon } from '../components/SocialIcons';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/contact', formData);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Message could not be sent",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeader 
          title="Contact Me" 
          highlightedWord="Me" 
          description="Have a project in mind or want to discuss potential opportunities? Let's get in touch."
        />
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <div className="w-full lg:w-2/5">
            <div className="glassmorphism rounded-md p-8 h-full">
              <h3 className="text-2xl font-bold text-accent mb-6">&lt;Get in Touch /&gt;</h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="text-accent text-2xl mt-1 mr-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-gray-300">dineshkumarcs0014@gmail.com</p>
                    <p className="text-gray-400 text-sm mt-1">Available for inquiries anytime</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-accent text-2xl mt-1 mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Location</h4>
                    <p className="text-gray-300">Bhubaneswar, India</p>
                    <p className="text-gray-400 text-sm mt-1">Available for remote work</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-accent text-2xl mt-1 mr-4">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">WhatsApp</h4>
                    <p className="text-gray-300">+91 8144252742</p>
                    <p className="text-gray-400 text-sm mt-1">Feel free to message me</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="font-bold mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com/Dinesh69069" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-[#1A1A1A] transition-colors" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/dinesh-kumar-sahoo-183533330/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-[#1A1A1A] transition-colors" aria-label="LinkedIn">
                    <i className="fab fa-linkedin"></i>
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a href="https://www.hackerrank.com/profile/dineshkumarcs001" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-[#1A1A1A] transition-colors" aria-label="HackerRank">
                    <i className="fab fa-hackerrank"></i>
                    <span className="sr-only">HackerRank</span>
                  </a>
                  <a href="https://wa.me/918144252742" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-[#1A1A1A] transition-colors" aria-label="WhatsApp">
                    <i className="fab fa-whatsapp"></i>
                    <span className="sr-only">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="w-full lg:w-3/5">
            <div className="glassmorphism rounded-md p-8">
              <h3 className="text-2xl font-bold text-[#FF3366] mb-6">&lt;Send Message /&gt;</h3>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-mono">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full p-3 bg-[#2D2D2D] border border-gray-700 rounded-sm focus:border-accent focus:outline-none transition-colors" 
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-mono">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full p-3 bg-[#2D2D2D] border border-gray-700 rounded-sm focus:border-accent focus:outline-none transition-colors" 
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-mono">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full p-3 bg-[#2D2D2D] border border-gray-700 rounded-sm focus:border-accent focus:outline-none transition-colors" 
                    placeholder="Enter Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-mono">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="w-full p-3 bg-[#2D2D2D] border border-gray-700 rounded-sm focus:border-accent focus:outline-none transition-colors resize-none" 
                    placeholder="Enter Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="neo-button w-full bg-[#FF3366] text-[#1A1A1A] px-8 py-3 rounded-sm font-mono font-bold tracking-wider hover:bg-opacity-90 shadow-neon-pink transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
