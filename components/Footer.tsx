import React from 'react';

interface FooterProps {
  onEasterEggClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onEasterEggClick }) => {
  return (
    <footer className="bg-[var(--color-darkest)] text-slate-400 py-8 border-t border-[var(--color-light)]/10">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} HOME Experience. Todos los derechos reservados.</p>
        <p className="text-sm mt-2">
          Creado con ♥ para los que buscan volver a casa.
        </p>
        <button
          onClick={onEasterEggClick}
          title="Para los que ya caminaron"
          className="mt-4 text-slate-600 hover:text-[var(--color-lightest)] transition-colors cursor-pointer text-xs"
          data-interactive="true"
        >
          ⌂
        </button>
      </div>
    </footer>
  );
};

export default Footer;