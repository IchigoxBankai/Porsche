import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailerPosition, setTrailerPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if mouse is over interactive elements
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, [data-cursor], input, select');
      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor-text');
        setCursorText(customText || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Smooth trailer cursor follow effect
  useEffect(() => {
    let animationFrameId: number;
    const animateTrailer = () => {
      setTrailerPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(animateTrailer);
    };
    animationFrameId = requestAnimationFrame(animateTrailer);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden lg:block">
      {/* Main Cursor Dot */}
      <div
        className={`fixed h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00F2FE] transition-transform duration-100 ease-out shadow-[0_0_10px_#00F2FE] ${
          isClicked ? 'scale-150 bg-[#E10600]' : isHovered ? 'scale-0' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Trailer Ring */}
      <div
        className={`fixed flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out ${
          isHovered
            ? 'h-16 w-16 border-[#00F2FE]/80 bg-[#00F2FE]/10 backdrop-blur-[2px] shadow-[0_0_25px_rgba(0,242,254,0.4)]'
            : isClicked
            ? 'h-8 w-8 border-[#E10600] bg-[#E10600]/20'
            : 'h-10 w-10 border-white/30 bg-transparent'
        }`}
        style={{
          left: `${trailerPosition.x}px`,
          top: `${trailerPosition.y}px`,
        }}
      >
        {cursorText && (
          <span className="font-display text-[9px] font-bold tracking-wider text-white uppercase px-1 text-center">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
