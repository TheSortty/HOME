
import React, { useState, TouchEvent } from 'react';
import { TESTIMONIALS } from '../constants';
import type { Testimonial } from '../types';
import StarIcon from './icons/StarIcon';
import SparkleIcon from './icons/SparkleIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

const truncateQuote = (quote: string, maxLength: number = 150) => {
  if (quote.length <= maxLength) {
    return quote;
  }
  return quote.substring(0, maxLength) + '...';
};

interface TestimonialsProps {
  onTestimonialClick: (testimonial: Testimonial) => void;
  onAddTestimonialClick: () => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onTestimonialClick, onAddTestimonialClick }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextTestimonial();
    }
    if (isRightSwipe) {
      prevTestimonial();
    }
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? TESTIMONIALS.length - 1 : prevIndex - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1));
  };

  const handleCardClick = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <section id="testimonials" className="py-24 md:py-40 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 relative">
          <SparkleIcon className="absolute top-0 left-1/4 h-8 w-8 text-[var(--color-light)]/20 transform -rotate-12 hidden md:block" />
          <h2 className="font-serif text-6xl md:text-8xl font-bold text-white mb-6">Voces de HOME</h2>
          <p className="max-w-4xl mx-auto text-2xl lg:text-3xl text-slate-200 leading-relaxed">
            Quienes ya caminaron este sendero comparten su experiencia.
          </p>
          <SparkleIcon className="absolute bottom-0 right-1/4 h-8 w-8 text-[var(--color-light)]/20 transform rotate-12 hidden md:block" />
        </div>

        <div 
          className="relative h-[500px] flex items-center justify-center touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {TESTIMONIALS.map((testimonial, index) => {
             const offset = index - currentIndex;
             // Handle cyclic wrapping logic for smoother infinite-like feel if desired, 
             // but standard offset works well for fixed lists.
             
             const isCurrent = offset === 0;
             const scale = isCurrent ? 1 : 0.8;
             const opacity = isCurrent ? 1 : 0.4;
             const zIndex = isCurrent ? 20 : 10;
             const rotation = isCurrent ? (index % 2 === 0 ? 1 : -1) : 0;
             const cursorStyle = isCurrent ? 'cursor-default' : 'cursor-pointer hover:opacity-60';
             
             let translateX = '0%';
             if (offset !== 0) {
                translateX = `${offset * 60}%`;
             }
             // Hide elements too far away to prevent clutter
             if (Math.abs(offset) > 2) {
                opacity: 0;
             }

            return (
                <div
                key={testimonial.id}
                className={`absolute w-full max-w-lg transition-all duration-500 ease-in-out ${cursorStyle}`}
                style={{
                  transform: `translateX(${translateX}) scale(${scale}) rotate(${rotation}deg)`,
                  opacity: Math.abs(offset) > 2 ? 0 : opacity,
                  zIndex: zIndex,
                  pointerEvents: Math.abs(offset) > 2 ? 'none' : 'auto'
                }}
                onClick={() => handleCardClick(index)}
              >
              <div
                className="bg-[var(--color-dark)]/20 backdrop-blur-md p-8 rounded-xl border border-[var(--color-light)]/20 shadow-lg flex flex-col h-[400px]"
                data-interactive={isCurrent}
              >
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className={`h-6 w-6 ${i < testimonial.rating ? 'text-[var(--color-lightest)]' : 'text-[var(--color-light)]/30'}`} />
                  ))}
                </div>
                <p className="text-xl text-slate-200 italic mb-6 flex-grow select-none">"{truncateQuote(testimonial.quote)}"</p>
                <div className="mt-auto">
                   <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when clicking button
                      if(isCurrent) onTestimonialClick(testimonial);
                    }}
                    className={`text-[var(--color-lightest)] font-bold hover:underline mb-4 ${!isCurrent ? 'invisible' : ''}`}
                    data-interactive="true"
                    >
                        Leer más...
                    </button>
                  <p className="text-xl font-bold text-white select-none">{testimonial.author}</p>
                  <p className="text-md text-slate-400 select-none">{`${testimonial.roles.join(' & ')}, ${testimonial.cycle}, PL ${testimonial.pl}`}</p>
                </div>
              </div>
            </div>
            )
          })}
        </div>

        <div className="flex justify-center items-center mt-12 space-x-6">
          <button onClick={prevTestimonial} className="p-3 rounded-full bg-[var(--color-light)]/20 hover:bg-[var(--color-light)]/40 transition-colors" data-interactive="true" aria-label="Anterior testimonio">
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </button>
          <div className="flex items-center space-x-2">
            {TESTIMONIALS.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-[var(--color-lightest)]' : 'bg-[var(--color-light)]/30 hover:bg-[var(--color-light)]/60'}`}
                aria-label={`Ir a testimonio ${index + 1}`}
              />
            ))}
          </div>
          <button onClick={nextTestimonial} className="p-3 rounded-full bg-[var(--color-light)]/20 hover:bg-[var(--color-light)]/40 transition-colors" data-interactive="true" aria-label="Siguiente testimonio">
            <ArrowRightIcon className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="text-center mt-16">
            <button 
                onClick={onAddTestimonialClick}
                className="bg-[var(--color-dark)]/20 backdrop-blur-md border border-[var(--color-light)]/20 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:bg-[var(--color-dark)]/40"
                data-interactive="true"
            >
                Comparte tu Viaje
            </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
