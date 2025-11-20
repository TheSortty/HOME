import React, { useState } from 'react';
import UnderlineWaveIcon from './icons/UnderlineWaveIcon';
import UserIcon from './icons/UserIcon';

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#who-we-are', label: 'Quiénes Somos' },
    { href: '#what-we-do', label: 'La Experiencia' },
    { href: '#testimonials', label: 'Testimonios' },
    { href: '#packages', label: 'Paquetes' },
    { href: '#contact', label: 'Contacto' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleSmoothScroll(e);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[var(--color-darkest)]/50 backdrop-blur-xl shadow-lg shadow-[var(--color-darkest)]/50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" onClick={handleSmoothScroll} className="font-serif text-3xl font-bold text-[var(--color-lightest)]" data-interactive="true">
          HOME
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleSmoothScroll}
              className="relative group text-[var(--color-light)] hover:text-[var(--color-lightest)] transition-colors duration-300 text-sm font-medium tracking-wider uppercase"
              data-interactive="true"
            >
              <span>{link.label}</span>
              <UnderlineWaveIcon className="absolute bottom-[-8px] left-0 w-full h-auto text-[var(--color-lightest)] transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100 origin-center" />
            </a>
          ))}
          
          <button 
            onClick={onLoginClick}
            className="ml-6 text-[var(--color-light)] hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
            title="Ingreso Administrador"
            data-interactive="true"
          >
            <UserIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
            <button 
              onClick={onLoginClick}
              className="mr-4 text-[var(--color-light)] hover:text-white transition-colors duration-300"
              data-interactive="true"
            >
               <UserIcon className="h-6 w-6" />
            </button>
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[var(--color-lightest)] focus:outline-none"
                data-interactive="true"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
                </svg>
            </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-[var(--color-darkest)] border-t border-[var(--color-light)]/10 shadow-xl transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleMobileLinkClick}
              className="text-[var(--color-light)] hover:text-[var(--color-lightest)] text-lg font-medium tracking-wide"
              data-interactive="true"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;