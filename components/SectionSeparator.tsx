import React from 'react';

const SectionSeparator: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 1440 100" 
    fill="currentColor"
    preserveAspectRatio="none"
    {...props}
  >
    <path d="M0,90 C480,30 960,30 1440,90 L1440,100 L0,100 Z"></path>
  </svg>
);

export default SectionSeparator;