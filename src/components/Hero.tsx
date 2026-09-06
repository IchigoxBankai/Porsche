import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Gauge, Flame, Compass, ChevronDown, Play, Lightbulb, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface HeroProps {
  onOpenTestDrive: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTestDrive }) => {
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [isEngineRevving, setIsEngineRevving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background floating cyber particle animation canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? '#00F2FE' : '#E10600',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleStartEngine = () => {
    setIsEngineRevving(true);
    soundEngine.startEngine();
    soundEngine.setRpm(4200);
    
    setTimeout(() => {
      soundEngine.playGearShiftPop();
      soundEngine.setRpm(1200);
      setIsEngineRevving(false);
    }, 1400);

    const el = document.getElementById('rev-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className={`relative min-h-screen pt-28 pb-16 flex flex-col justify-between items-center overflow-hidden bg-[#07090D] cyber-grid ${
        isEngineRevving ? 'animate-engine' : ''
      }`}
    >
      {/* Background Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Dynamic Background Ambient Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#00F2FE]/20 via-[#E10600]/15 to-transparent blur-[160px] pointer-events-none rounded-full animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-cyan-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-red-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Header Tagline & Titles with Motion */}
      <div className="z-10 text-center px-4 max-w-5xl mx-auto space-y-4">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00F2FE] tracking-widest uppercase mb-2 shadow-[0_0_15px_rgba(0,242,254,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00F2FE] animate-spin" />
          <span>FUTURE CONCEPT // PRODUCTION LEADER 2026</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-none drop-shadow-2xl"
        >
          PORSCHE{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-[#00F2FE] text-glow">
            MISSION X
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-300 font-sans text-base sm:text-xl font-light tracking-widest uppercase max-w-2xl mx-auto"
        >
          The Reinvention of the Hypercar. 1,520 PS // 1:1 Power-to-Weight Ratio
        </motion.p>

      </div>

      {/* Centerpiece Car Presentation with Hover Floating & Light Beam Effects */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 my-4 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="relative w-full max-w-4xl group animate-float"
        >
          {/* Illuminated Headlight Overlay Effect */}
          {headlightsOn && (
            <>
              <div className="absolute top-[38%] left-[22%] w-28 h-28 bg-[#00F2FE] blur-2xl opacity-90 pointer-events-none rounded-full animate-pulse-glow" />
              <div className="absolute top-[38%] right-[22%] w-28 h-28 bg-[#00F2FE] blur-2xl opacity-90 pointer-events-none rounded-full animate-pulse-glow" />
              {/* Headlight beam projection */}
              <div className="absolute top-[42%] left-[5%] w-[90%] h-52 bg-gradient-to-t from-transparent via-[#00F2FE]/20 to-transparent blur-3xl pointer-events-none -rotate-6" />
            </>
          )}

          {/* Car Image */}
          <img
            src="./images/hero_car_front.png"
            alt="Porsche Mission X Hypercar"
            className="w-full h-auto object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.95)] transition-transform duration-700 group-hover:scale-[1.03]"
          />

          {/* Floor Reflection Gradient */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent blur-2xl rounded-full" />
        </motion.div>

        {/* Headlight Toggle Floating Action */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={() => setHeadlightsOn(!headlightsOn)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-3 flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-white/15 text-xs font-mono tracking-wider text-gray-300 hover:text-white hover:border-[#00F2FE]/60 transition-all shadow-md cursor-pointer"
        >
          <Lightbulb className={`w-4 h-4 ${headlightsOn ? 'text-[#00F2FE] animate-pulse' : 'text-gray-500'}`} />
          <span>HEADLIGHTS: {headlightsOn ? 'ILLUMINATED' : 'OFF'}</span>
        </motion.button>
      </div>

      {/* Telemetry HUD Grid & CTAs */}
      <div className="z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center gap-8">
        
        {/* HUD Telemetry Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl"
        >
          <motion.div
            whileHover={{ y: -4, borderColor: '#00F2FE' }}
            className="glass-card p-4 rounded-2xl flex flex-col justify-between border-l-2 border-l-[#00F2FE] transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
              <span>OUTPUT</span>
              <Flame className="w-4 h-4 text-[#00F2FE]" />
            </div>
            <div className="mt-2">
              <span className="font-display text-2xl sm:text-3xl font-black text-white">1,520</span>
              <span className="text-xs font-mono text-cyan-400 ml-1">PS</span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 uppercase">1:1 Power Ratio</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, borderColor: '#E10600' }}
            className="glass-card p-4 rounded-2xl flex flex-col justify-between border-l-2 border-l-[#E10600] transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
              <span>ACCELERATION</span>
              <Gauge className="w-4 h-4 text-[#E10600]" />
            </div>
            <div className="mt-2">
              <span className="font-display text-2xl sm:text-3xl font-black text-white">&lt; 1.79</span>
              <span className="text-xs font-mono text-red-500 ml-1">SEC</span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 uppercase">0-60 MPH Sprint</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, borderColor: '#F59E0B' }}
            className="glass-card p-4 rounded-2xl flex flex-col justify-between border-l-2 border-l-amber-400 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
              <span>DOWNFORCE</span>
              <Compass className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2">
              <span className="font-display text-2xl sm:text-3xl font-black text-white">860</span>
              <span className="text-xs font-mono text-amber-400 ml-1">KG</span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 uppercase">At 177 MPH</span>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, borderColor: '#10B981' }}
            className="glass-card p-4 rounded-2xl flex flex-col justify-between border-l-2 border-l-emerald-400 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
              <span>CHARGING</span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2">
              <span className="font-display text-2xl sm:text-3xl font-black text-white">900</span>
              <span className="text-xs font-mono text-emerald-400 ml-1">VOLT</span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 uppercase">System Architecture</span>
          </motion.div>
        </motion.div>

        {/* Hero CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartEngine}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-red-600 via-[#E10600] to-red-800 text-white font-display text-sm font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(225,6,0,0.6)] hover:shadow-[0_0_45px_rgba(225,6,0,0.95)] transition-all duration-300 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white animate-pulse" />
            <span>START ENGINE & REV</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenTestDrive}
            className="flex items-center gap-2 px-8 py-4 rounded-full glass-card border border-white/20 text-white font-display text-sm font-bold uppercase tracking-widest hover:border-[#00F2FE] hover:text-[#00F2FE] transition-all duration-300 cursor-pointer"
          >
            <span>RESERVE HYPERCAR</span>
          </motion.button>
        </motion.div>

        {/* Scroll Down Indicator */}
        <a
          href="#aerodynamics"
          className="mt-2 flex flex-col items-center gap-1 text-gray-400 hover:text-[#00F2FE] transition-colors group cursor-pointer"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">EXPLORE AERODYNAMICS</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform animate-bounce" />
        </a>

      </div>
    </section>
  );
};

export default Hero;

