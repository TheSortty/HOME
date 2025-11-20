import React from 'react';
import SparkleIcon from './icons/SparkleIcon';

interface WhoWeAreProps {
  onConfioClick: () => void;
}

const WhoWeAre: React.FC<WhoWeAreProps> = ({ onConfioClick }) => {
  return (
    <section 
      id="who-we-are" 
      className="py-24 md:py-40 text-white"
    >
      <div className="container mx-auto px-6 text-center">
        <div className="relative inline-block">
            <SparkleIcon className="absolute -top-8 -left-12 h-10 w-10 text-[var(--color-light)]/30 transform -rotate-12 hidden md:block" />
            <h2 className="font-serif text-6xl md:text-8xl font-bold mb-8">
            Más que un programa, un regreso a casa.
            </h2>
            <SparkleIcon className="absolute -bottom-4 -right-12 h-10 w-10 text-[var(--color-light)]/30 transform rotate-12 hidden md:block" />
        </div>
        <p className="max-w-5xl mx-auto text-2xl lg:text-3xl text-slate-200 leading-relaxed">
          HOME es un espacio seguro para soltar lo que ya no sirve, conectar con tu verdad y construir desde un lugar de autenticidad. No te damos las respuestas, te acompañamos a que encuentres las tuyas. Es un acto de valentía, un salto de{' '}
          <span
            className="animate-confianza"
            onClick={onConfioClick}
            title="¿Qué significa confiar?"
            data-interactive="true"
          >
            confianza
          </span>
          {' '}en tu propio proceso.
        </p>
      </div>
    </section>
  );
};

export default WhoWeAre;