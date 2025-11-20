import React from 'react';

const JourneyPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Central path */}
    <path d="M20,80 Q50,20 80,80" />
    
    {/* Decorative stars */}
    <circle cx="50" cy="35" r="3" fill="currentColor" stroke="none" />
    <path d="M18 78 L 22 82" />
    <path d="M22 78 L 18 82" />
    <path d="M82 78 L 78 82" />
    <path d="M78 78 L 82 82" />
  </svg>
);

export default JourneyPathIcon;
