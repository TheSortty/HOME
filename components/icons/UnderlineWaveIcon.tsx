import React from 'react';

const UnderlineWaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 10"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    preserveAspectRatio="none"
    {...props}
  >
    {/* Main line */}
    <path d="M5,5 L95,5" />
    {/* Left hook */}
    <path d="M5,5 C0,5 0,0 5,0" />
    {/* Right hook */}
    <path d="M95,5 C100,5 100,0 95,0" />
    {/* Center diamond */}
    <path d="M48,5 L50,3 L52,5 L50,7 Z" fill="currentColor"/>
  </svg>
);

export default UnderlineWaveIcon;