'use client';

import { useState, useEffect } from 'react';

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeProject, setActiveProject] = useState(0);
  const [visibleExperiences, setVisibleExperiences] = useState(new Set());

  const experiences = [
    {
      title: "ENGINEERING INTERN",
      company: "Griswold Controls",
      period: "May 2025-Present",
      points: [
        "Utilize SolidWorks and CNC programming for high-volume product design and manufacturing while managing complex supply chain data and quality control systems through ERP software."
      ]
    },
    {
      title: "STUDENT RESEARCHER",
      fill: " ",
      company: "Mumm Research Group",
      period: "Feb 2025-Present",
      points: [
        "Analyze the effect of mechanical alloying methods on the thermodynamic behavior of diffusion profiles to develop oxidation-resistant refractory alloys."
      ]
    },
    {
      title: "MECHANICAL ENGINEERING INTERN",
      company: "Fossil Energy Research Corp.",
      period: "Jun 2021-Dec 2022",
      points: [
        "Applied experimental analysis and AutoCAD drafting to optimize flow and chemical dristribution within industrial power plant catalysts."
      ]
    }
  ];

  const projects = [
    {
      id: 1,
      name: "CHEME CUBE",
      image: "/1.png",
      paragraphs: [
        "GOAL: Design and manufacture a modular 1 cubic foot direct air capture unit, innovating on current industry-level CO2 removal solutions.",
        "DESIGN: Led 25 engineers by managing a bill of materials, delegating tasks, integrating systems architecture based on curated SolidWorks CAD model and KiCAD electronics diagram, and validating system performance with Simulink.",
        "RESULTS: Our team earned 1 of 23 invitations to attend and compete in the Annual AIChE Student Conference where we captured 76% of input carbon dioxide and placed 7th of all colleges and universities on a worldwide level."
      ]
    },
    {
      id: 2,
      name: "Robotic Arm",
      image: "/2.png",
      paragraphs: [
        "GOAL: Manage 5 engineers to integrate additive manufacturing with servo controls, developing a robot which detects and mimics human gestures.",
        "DESIGN: Applied GD&T to manufacture over 100 3D-printed components designed for sensor integration and wire management. The embedded system included stepper motors and a camera, connected by an Arduino Uno programmed in C++.",
        "RESULTS: Optimized space, electronic management, and safety. Achieved under a .005” tolerance fit and finished 1st of over 20 teams."
      ]
    },
    {
      id: 3,
      name: "Flow-Regulating Cartridges",
      image: "/3.png",
      paragraphs: [
        "GOAL: Achieve nominal flows throughout complex piping system conditions from 2-108 PSID.",
        "DESIGN: Programmed a laser cutter using G-Code to automate the production of over 50 types of cartridges, designed 4 testing fixtures, conducted over 100 flow tests, implemented new company-wide data collection procedures, and created over 50 engineering drawings.",
        "RESULTS: Achieved flow rates from .16 GPM to 300 GPM. Developed products suffice for over $200,000 of cartridge revenue per quarter."
      ]
    },
    {
      id: 4,
      name: "POWER SUPPLY",
      image: "/4.png",
      paragraphs: [
        "GOAL: Relate capacitors, diodes, resistors, op-amps, LEDs, and potentiometers to create a device to covert and generate DC from an AC source.",
        "DESIGN: Formed a transformer, diode bridge, filter capacitors, and a voltage regulator. Implemented and integrated these components by soldering this architecture onto a custom PCB.",
        "RESULTS: Applied rectification using diodes with the charging and discharging of capacitors to achieve adaptive power regulation implemented across 3 projects for accessible power sourcing."
      ]
    },
    {
      id: 5,
      name: "AUTONOMOUS ROVER",
      image: "/5.png",
      paragraphs: [
        "GOAL: Fabricate and program a rover to follow a given path and locate a target without intervention.",
        "DESIGN: Modeled 3D-printed and laser-cut components in SolidWorks. Programmed IR sensors and a camera to send data to stepper motors through a motor shield and micro-controller with Arduino.",
        "RESULTS: First team to finish and had the fastest code run time, achieving extra credit by placing within the top 5 of over 20 teams within the class."
      ]
    },
    {
      id: 6,
      name: "REMOTE-CONTROLLED ROVER",
      image: "/6.png",
      paragraphs: [
        "GOAL: Manufacture a rover to complete a course within a budget of $275 and in less than 10 weeks.",
        "DESIGN: Planning required material selection and SolidWorks CAD modeling. 3D printing, and machine shop tools such as a bandsaw, jigsaw, and drill press were used in the fabrication process.",
        "RESULTS: Demonstrated torque, center of mass and weight distribution, as well as mechanical advantage, ultimately placing in the top 5 of 56."
      ]
    },
    {
      id: 7,
      name: "IN-PROGRESS: PHOTOLITHOGRAPHY STEPPER",
      image: "/7.png",
      paragraphs: [
        "GOAL: Imitate and innovate the lithography stepping process with high precision and low costs.",
        "DESIGN: Utilized Onshape to develop the frame and stage designed specifically for motors, embedded electronics, and vibration damping.",
        "PROGRESS: Linked the proximity sensor, camera, and micrometer to the stepper motors using Python, then conducted PID testing through Simulink to optimize its accuracy and precision."
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'values', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Check visibility of experience items - ensure at least one is always highlighted
      const newVisibleExperiences = new Set();
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      experiences.forEach((_, index) => {
        const element = document.getElementById(`experience-${index}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const centerY = windowHeight / 2;
          const elementCenterY = rect.top + rect.height / 2;
          const distance = Math.abs(centerY - elementCenterY);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });
      
      // Always highlight the closest experience to center
      newVisibleExperiences.add(closestIndex);
      setVisibleExperiences(newVisibleExperiences);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array - experiences is stable

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Montserrat', sans-serif;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <div className="bg-white text-gray-900 font-['Montserrat',sans-serif] overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="max-w-[85%] mx-auto px-6 py-4 flex justify-between items-center">
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition-all"
            >
              JC
            </button>

            <div className="hidden md:flex gap-8">
              {['values', 'experience', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`uppercase tracking-wider transition-all ${
                    activeSection === section
                      ? 'font-bold text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden relative">
              <button
                className="w-8 h-8 relative flex flex-col justify-center items-center group"
                onClick={() => setMenuOpen(!menuOpen)}
                onMouseEnter={() => setMenuOpen(true)}
              >
                <div
                  className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 absolute ${
                    menuOpen ? 'rotate-45' : '-translate-y-2'
                  }`}
                />
                <div
                  className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <div
                  className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 absolute ${
                    menuOpen ? '-rotate-45' : 'translate-y-2'
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-12 right-0 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${
                  menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="py-2 min-w-[200px]">
                  {['values', 'experience', 'projects', 'contact'].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`w-full text-left px-6 py-3 uppercase tracking-wider transition-all ${
                        activeSection === section
                          ? 'font-bold text-gray-900 bg-gray-100'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-[120vh] pt-24 pb-16 px-6 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">

          {/* Straight dark background - comes from bottom left to top right */}
          <div 
            className="absolute inset-0 bg-gradient-to-b pr from-gray-700 to-gray-800"
            style={{
              clipPath: 'polygon(0 75%, 100% 75%, 100% 100%, 0 100%)',
            }}
            />

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 translate-y-24 md:-translate-y-24 lg:-translate-y-24">
              <h1 className="text-5xl md:text-7xl font-light animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                Hi, I'm <span className="font-bold">Jillyan</span>.
              </h1>
              <p className="text-xl md:text-2xl px-0.5 text-gray-600 uppercase tracking-wider animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                Mechanical Engineer
              </p>
              <p className="text-gray-600 px-1 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                Efficiency fuels a creative mind. From optimizing industrial workflows to leading multidisciplinary teams, I am driven to challenge today's limits and create tomorrow's possibilities.
              </p>
              <button
                onClick={() => scrollToSection('values')}
                className="mt-8 group flex items-center gap-2 animate-fadeInUp"
                style={{ animationDelay: '0.8s' }}
              >
                <span className="uppercase tracking-wider px-1">Explore</span>
                <svg
                  className="w-6 h-6 transform group-hover:translate-y-2 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
            {/* <div className="relative h-96 sm:translate-x-40 md:h-[700px] lg:h-[700px] lg:translate-x-40">
              <img
                src="/webPortImg.1.png"
                alt="Engineering blueprint"
                className="scale-[210%] h-full object-contain translate-y-20 sm:scale-180%] md:translate-y-40 translate-x-20"
              />
            </div> */}
              <div className="relative h-96 sm:translate-x-40 md:h-[700px] lg:h-[700px] lg:translate-x-40">
              <img
                src="/10.png"
                alt="Engineering blueprint"
                className="scale-[130%] h-full object-contain translate-y-20 sm:scale-[180%] md:translate-y-60 translate-x-20" style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.9) 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.9) 90%)'}}
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section id="values" className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white py-24 px-6 pt-0 md:pt-60 lg:pt-60 relative overflow-hidden -mt-1">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light tracking-[0.3em] text-gray-500 mb-16 lg:text-right lg:-translate-y-20">
              VALUES
            </h2>
            <div className=" grid md:grid-cols-2 gap-16 pb-48 items-center">
              {/* Rotating Circles */}
              <div className="hidden md:flex relative lg:translate-x-[-70%] lg:scale-[260%] h-[500px] items-center justify-center">
                <div className="absolute w-[450px] h-[450px] rounded-full border-2 border-dashed border-gray-700 animate-spin-slow" />
                <div className="absolute w-[320px] h-[320px] rounded-full border-2 border-dashed border-gray-600 animate-spin-reverse" />
                <div className="absolute w-[190px] h-[190px] rounded-full border-2 border-dashed border-gray-500 animate-spin-slow" />
              </div>

              {/* Values Content */}
              <div className="space-y-12 lg:space-y-36">
                <div className="space-y-3">
                  <h3 className="text-2xl font-light tracking-wider lg:-translate-x-20">PRECISION</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Engineering excellence is founded upon rigorous quality assurance and the strict implementation of GD&T standards to ensure consumer safety and system reliability.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-light tracking-wider lg:-translate-x-12">DESIGN</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Efficiency remains at the core of every project, formed by an extensive background in the fine arts which enables a creative, scalable, and modular approach to problem-solving.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-light tracking-wider lg:-translate-x-20">INTEGRITY</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Engineering ethics and lean manufacturing principles are tied together by a positive, forward-thinking mindset-- driving actions as Vice President of the ZOTBotics Robotics Club or as Director of Public Relations in Engineering Student Council.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


{/* Experience Section */} 
<section id="experience" className="-mt-1 min-h-screen bg-gray-900 text-white py-24 px-6 pt-12">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl lg:pt-64 md:text-5xl font-light tracking-[0.3em] text-gray-600 mb-16">
      EXPERIENCE
    </h2>
    
    {/* Main timeline container with centered line */}
    <div className="relative">
      {/* Vertical line - positioned at exact center of first column */}
      <div className="hidden md:block -translate-x-3 absolute left-[calc(8.33%/2)] top-0 bottom-0 w-px bg-gray-700" />
      
      <div className="space-y-16 md:space-y-24">
        {experiences.map((exp, index) => (
          <div 
            key={index}
            id={`experience-${index}`}
            className="grid md:grid-cols-12 gap-6 md:gap-8 items-start relative"
          >
            {/* Timeline dot container */}
            <div className="hidden md:block md:col-span-1 translate-x-0.5 relative">
              <div className="flex justify-center relative z-10">
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-500 ${
                    visibleExperiences.has(index)
                      ? 'bg-blue-300 shadow-[0_0_25px_rgba(96,165,250,1)] scale-125'
                      : 'bg-gray-600'
                  }`}
                />
              </div>
            </div>

            {/* Content */}
            <div className={`md:col-span-11 transition-all duration-500 ${
              visibleExperiences.has(index)
                ? 'text-white opacity-100'
                : 'text-gray-600 opacity-50'
            }`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h3 className="text-2xl md:text-3xl font-light tracking-wider mb-3 md:mb-0">
                  {exp.title}
                </h3>
                {/* Fixed: Changed to text-left on mobile, text-right on desktop */}
                <div className="text-left md:text-right">
                  <p className={visibleExperiences.has(index) ? 'text-gray-300' : 'text-gray-500'}>
                    {exp.fill}
                  </p>
                  <p className={visibleExperiences.has(index) ? 'text-gray-300' : 'text-gray-500'}>
                    {exp.period}
                  </p>
                  <p className={visibleExperiences.has(index) ? 'text-gray-400' : 'text-gray-500'}>
                    {exp.company}
                  </p>
                </div>
              </div>
              <ul className="space-y-4 pl-0">
                {exp.points.map((point, idx) => (
                  <ul
                    key={idx}
                    className="leading-relaxed"
                  >
                    {point}
                  </ul>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

        {/* Projects Section */}
        <section id="projects" className="-mt-1 min-h-screen bg-gradient-to-b from-gray-900 to-gray-900 text-white py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl lg:pt-12 md:text-5xl font-light tracking-[0.3em] text-gray-700 mb-16">
              PROJECTS
            </h2>

            {/* Project Display */}
            <div className="mb-16">
              <h3 className="text-3xl md:text-4xl font-light mb-8 tracking-wider lg:pb-12">
                {projects[activeProject].name}
              </h3>
              <div className="grid md:grid-cols-2 opacity-[75%] gap-12 items-start">
                <div className="flex justify-center items-center h-64 md:h-96 lg:-translate-y-12 rounded-lg overflow-hidden">
                  <img
                    src={projects[activeProject].image}
                    alt={projects[activeProject].name}
                    className="h-full object-cover duration-500"
                  />
                </div>
                <div className="space-y-6">
                  {projects[activeProject].paragraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-gray-400 leading-relaxed animate-fadeIn"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Numbers */}
            <div className="flex flex-wrap gap-8 justify-center">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(index)}
                  onMouseEnter={() => setActiveProject(index)}
                  className={`text-2xl md:text-3xl font-light transition-all duration-300 ${
                    activeProject === index
                      ? 'text-blue-200 scale-110 drop-shadow-[0_0_15px_rgba(96,165,250,1)]'
                      : 'text-gray-600 hover:text-gray-400'
                  }`}
                >
                  {String(project.id).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
        </section>

{/* Contact Section - No overflow, no cutoff */}
<section id="contact" className="-mt-1 min-h-[85vh] bg-gradient-to-b from-gray-900 to-black text-white pt-24 pb-72 px-6 relative">
  <div className="max-w-7xl mx-auto relative z-10">
    <h2 className="text-4xl md:text-5xl font-light tracking-[0.3em] text-gray-700 mb-16">
      CONTACT
    </h2>
    <div className="space-y-8">
      <div>
        <p className="text-gray-500 uppercase tracking-wider mb-2">Email</p>
        <a
          href="mailto:jillyancanaveral@gmail.com"
          className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light hover:text-gray-400 transition-colors break-all md:break-words"
        >
          jillyancanaveral@gmail.com
        </a>
      </div>
      <div>
        <p className="text-gray-500 uppercase tracking-wider mb-2">Phone</p>
        <a
          href="tel:+19496195389"
          className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light hover:text-gray-400 transition-colors"
        >
          +1 (949) 919-5389
        </a>
      </div>
    </div>
  </div>
  
  {/* Image with safe positioning */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="relative w-full h-full">
      <img
        src="/webPortImg.1.png"
        alt="Engineering blueprint"
        className="translate-x-20 md:translate-x-40 lg:translate-x-60 absolute bottom-12 right-4 h-auto w-auto max-h-[80vh] max-w-[75vw] md:max-w-[65vw] lg:max-w-[55vw] object-contain"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.9) 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.9) 90%)'
        }}
      />
    </div>
  </div>
</section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-600 py-8 px-6 border-t border-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm tracking-wider">
              © JILLYAN CANAVERAL 2026
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}