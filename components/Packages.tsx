import React from 'react';
import { PACKAGES } from '../constants';
import type { Package } from '../types';
import CheckIcon from './icons/CheckIcon';
import SparkleIcon from './icons/SparkleIcon';

const PackageCard: React.FC<{ packageInfo: Package }> = ({ packageInfo }) => {
  const cardClasses = packageInfo.isFeatured
    ? 'border-[var(--color-lightest)] scale-105 shadow-2xl shadow-[var(--color-lightest)]/20 z-10'
    : 'border-[var(--color-light)]/20';
  
  const buttonClasses = packageInfo.isFeatured
    ? 'bg-[var(--color-lightest)] text-[var(--color-darkest)] hover:bg-white'
    : 'bg-[var(--color-light)]/80 text-white hover:bg-[var(--color-light)]';

  return (
    <div className={`rounded-2xl p-8 transition-all duration-300 ${cardClasses} flex flex-col bg-gradient-to-br from-[var(--color-dark)]/30 to-[var(--color-darkest)]/30 backdrop-blur-lg border`} data-interactive="true">
      {packageInfo.isFeatured && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <span className="relative bg-[var(--color-lightest)] text-[var(--color-darkest)] text-sm font-bold px-4 py-1 rounded-full uppercase tracking-wider">
            <SparkleIcon className="absolute -left-2 -top-2 h-4 w-4 text-white -rotate-12" />
            Más Popular
            <SparkleIcon className="absolute -right-2 -bottom-2 h-4 w-4 text-white rotate-12" />
            </span>
        </div>
      )}
      <h3 className="font-serif text-5xl font-bold text-white text-center mb-2">{packageInfo.name}</h3>
      <p className="text-xl text-slate-300 text-center mb-6 h-20">{packageInfo.description}</p>
      <p className="text-7xl font-bold text-white text-center mb-8">
        {packageInfo.price}
        <span className="text-2xl font-normal text-slate-400">/ciclo</span>
      </p>
      <ul className="space-y-4 mb-8 flex-grow">
        {packageInfo.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className="h-7 w-7 text-[var(--color-lightest)] mr-3 flex-shrink-0 mt-1" />
            <span className="text-xl text-slate-200">{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href={packageInfo.paymentLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full block text-center font-bold py-4 px-8 text-xl rounded-full transition-all duration-300 ${buttonClasses}`}
        data-interactive="true"
      >
        Seleccionar Plan
      </a>
    </div>
  );
};

const Packages: React.FC = () => {
  return (
    <section 
      id="packages" 
      className="py-24 md:py-40"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-serif text-6xl md:text-8xl font-bold text-white mb-6">
            Encuentra tu camino
          </h2>
          <p className="max-w-4xl mx-auto text-2xl lg:text-3xl text-slate-200 leading-relaxed">
            Cada paquete es un paso en el mismo viaje continuo. Elige por dónde empezar.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto items-start">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className="relative">
              <PackageCard packageInfo={pkg} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;