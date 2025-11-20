import React, { useEffect, useRef } from 'react';

interface CustomCursorProps {
  isAdmin?: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isAdmin = false }) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Admin Cursor: White arrow with Dark Blue outline
  const ADMIN_CURSOR_SVG = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 4L11 21L13.5 13.5L21 11L4 4Z' fill='white' stroke='%231E3A8A' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E"), auto`;

  useEffect(() => {
    // Apply cursor styles to HTML element to override the CSS 'cursor: none'
    const htmlEl = document.documentElement;
    
    if (isAdmin) {
      htmlEl.style.cursor = ADMIN_CURSOR_SVG;
      // Ensure we don't have leftover listeners if switching modes fast
      return () => {
         htmlEl.style.cursor = 'auto'; // Reset or let next effect take over
      };
    } else {
      htmlEl.style.cursor = 'none';
    }

    // Only run animation logic if NOT in admin mode
    if (isAdmin) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      if (ringRef.current) {
        // Simple easing for a smoother ring follow
        ringX += (mouseX - ringX) * 0.2;
        ringY += (mouseY - ringY) * 0.2;
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-interactive="true"]')) {
        ringRef.current?.classList.add('active');
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-interactive="true"]')) {
        ringRef.current?.classList.remove('active');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAdmin]);

  // If admin, we render NOTHING in the DOM. The cursor is handled via CSS on the body/html.
  if (isAdmin) {
    return null;
  }

  return (
    <>
      <div id="cursor-dot" ref={dotRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
    </>
  );
};

export default CustomCursor;