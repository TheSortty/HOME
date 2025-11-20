import React from 'react';

const ChartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5M3.75 3h13.5c.621 0 1.129.504 1.09 1.124a17.902 17.902 0 00.212 2.576C19.128 8.127 21 9.36 21 10.875v3.75c0 1.515-1.872 2.748-4.352 4.175a17.902 17.902 0 00-2.576.212c-.62.039-1.124-.469-1.124-1.091V6.25a2.25 2.25 0 00-2.25-2.25H3.75z" />
  </svg>
);

export default ChartIcon;