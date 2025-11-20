import React from 'react';

interface EasterEggProps {
  isVisible: boolean;
  onClose: () => void;
}

const EasterEggConfio: React.FC<EasterEggProps> = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 font-sans"
      onClick={onClose}
    >
      <div 
        className="bg-[var(--color-darkest)] text-white border-2 border-[var(--color-lightest)]/50 rounded-lg shadow-2xl p-8 max-w-md w-full text-left relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'Lato', sans-serif" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="font-serif text-2xl font-bold text-[var(--color-lightest)] mb-4">
          Una elección.
        </h2>
        <p className="text-slate-300 mb-6">
          Confiar. No confiar. Ambas son un salto al vacío. La única diferencia es en qué dirección eliges saltar.
        </p>
        <p className="text-sm text-[var(--color-light)]/80 italic">
          A veces, la decisión más difícil es la que ya tomaste sin darte cuenta.
        </p>
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

export default EasterEggConfio;