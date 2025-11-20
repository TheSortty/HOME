import React from 'react';
import { Testimonial } from '../types';
import StarIcon from './icons/StarIcon';
import PhotoIcon from './icons/PhotoIcon';

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  onClose: () => void;
}

const TestimonialModal: React.FC<TestimonialModalProps> = ({ testimonial, onClose }) => {
  if (!testimonial) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[var(--color-dark)]/50 backdrop-blur-xl border border-[var(--color-light)]/20 rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
          aria-label="Cerrar modal"
          data-interactive="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className={`h-7 w-7 ${i < testimonial.rating ? 'text-[var(--color-lightest)]' : 'text-[var(--color-light)]/30'}`} />
          ))}
        </div>

        <p className="text-2xl lg:text-3xl text-slate-200 italic leading-relaxed mb-8">
          "{testimonial.quote}"
        </p>

        <div className="border-t border-[var(--color-light)]/20 pt-6 mb-8">
            <p className="text-2xl font-bold text-white">{testimonial.author}</p>
            <p className="text-lg text-slate-400">{`${testimonial.roles.join(' & ')}, ${testimonial.cycle}, PL ${testimonial.pl}`}</p>
        </div>
        
        {/* Placeholder for future multimedia */}
        <div>
            <h3 className="font-serif text-2xl text-[var(--color-lightest)] mb-4">Recuerdos del viaje:</h3>
             <div className="aspect-video bg-[var(--color-darkest)]/50 rounded-lg flex items-center justify-center border-2 border-dashed border-[var(--color-light)]/20">
                <div className="text-center text-slate-400">
                    <PhotoIcon className="mx-auto h-12 w-12 mb-2" />
                    <p>Imágenes y videos próximamente.</p>
                </div>
            </div>
        </div>


      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TestimonialModal;