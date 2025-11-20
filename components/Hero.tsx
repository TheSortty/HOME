import React from 'react';
import SectionSeparator from './SectionSeparator';

const Hero: React.FC = () => {
  const handleScrollToPackages = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('packages');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10"></div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="https://res.cloudinary.com/dgduc73hq/video/upload/v1762923487/Blured_PPL_walking_c5mpvk.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-20 text-center p-6 flex-grow flex flex-col items-center justify-center">
        <h1 className="font-serif text-7xl md:text-9xl lg:text-[10rem] font-bold mb-4 tracking-tight leading-none">
          Bienvenido a HOME
        </h1>
        <p className="font-sans text-2xl md:text-3xl lg:text-4xl max-w-5xl mx-auto mb-12 font-light leading-relaxed">
          Un viaje de regreso a tu esencia. Redescubre, rompe y renace.
        </p>
        <a
          href="#packages"
          onClick={handleScrollToPackages}
          className="bg-[var(--color-medium)] text-white font-bold py-6 px-14 rounded-full text-2xl hover:bg-[var(--color-light)] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[var(--color-dark)]/50 cursor-pointer"
          data-interactive="true"
        >
          Comienza tu viaje
        </a>
      </div>
       <SectionSeparator className="absolute bottom-0 left-0 w-full h-auto text-[var(--color-darkest)] z-20" />
    </section>
  );
};

export default Hero;