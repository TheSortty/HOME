import React from 'react';
import JourneyPathIcon from './icons/JourneyPathIcon';
import SparkleIcon from './icons/SparkleIcon';

const acts = [
  {
    title: '1. Verte',
    description: 'Un espacio para la introspección, para mirarte sin juicios y reconocer tu punto de partida. La honestidad radical como herramienta principal.',
    videoUrl: 'https://res.cloudinary.com/dgduc73hq/video/upload/v1762979185/9038530-uhd_2160_4096_25fps_oihkyz.mp4',
    altText: 'Persona reflejada en el agua, simbolizando la introspección.',
  },
  {
    title: '2. Romperte',
    description: 'Con valentía, confrontarás tus límites y creencias para abrir espacio a lo nuevo. La vulnerabilidad se convierte en tu mayor fortaleza.',
    videoUrl: 'https://res.cloudinary.com/dgduc73hq/video/upload/v1762978960/6719636-uhd_2160_3840_25fps_wigfgj.mp4',
    altText: 'Una escultura de una cabeza que se rompe, simbolizando la deconstrucción de creencias.',
  },
  {
    title: '3. Renacer',
    description: 'Desde la aceptación, construirás una versión más fuerte y alineada de ti mismo, integrando todas tus partes.',
    videoUrl: 'https://res.cloudinary.com/dgduc73hq/video/upload/v1762978209/6275800-uhd_2160_4096_25fps_ynspp6.mp4',
    altText: 'Mariposa posada en una mano, simbolizando el renacimiento y la transformación.',
  }
];

const WhatWeDo: React.FC = () => {
  return (
    <section 
      id="what-we-do" 
      className="py-24 md:py-40"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
            <JourneyPathIcon className="mx-auto h-24 w-24 text-[var(--color-light)] mb-8" />
            <h2 className="font-serif text-6xl md:text-8xl font-bold mb-6 text-white">
                Un Viaje en Tres Actos
            </h2>
            <p className="max-w-4xl mx-auto text-2xl lg:text-3xl text-slate-200 leading-relaxed">
                La experiencia se desarrolla en un flujo continuo, donde cada etapa construye sobre la anterior, llevándote más profundo en tu propio universo.
            </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline */}
          <div className="absolute left-4 md:left-1/2 w-0.5 h-full bg-[var(--color-light)]/20 -translate-x-1/2"></div>
          
          <div className="space-y-24">
            {acts.map((act, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div className="absolute top-0 left-4 md:left-1/2 w-4 h-4 bg-[var(--color-lightest)] rounded-full -translate-x-1/2 border-4 border-[var(--color-darkest)]"></div>
                
                <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Video */}
                  <div className="md:w-1/2 pl-12 md:pl-0 flex justify-center" data-interactive="true">
                    <div className="w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                      <video
                        src={act.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        aria-label={act.altText}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 pl-12 md:pl-0 relative ${index % 2 !== 0 ? 'md:pr-16' : ''}`}>
                    <SparkleIcon className="absolute -top-8 -left-4 h-8 w-8 text-[var(--color-light)]/50 transform rotate-12" />
                     <SparkleIcon className="absolute -bottom-8 -right-4 h-12 w-12 text-[var(--color-light)]/30 transform -rotate-12" />
                    <h3 className="font-serif text-5xl md:text-6xl font-semibold text-[var(--color-lightest)] mb-4">{act.title}</h3>
                    <p className="text-2xl text-slate-200 leading-relaxed">{act.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;