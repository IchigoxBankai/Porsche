import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Shield, ChevronRight, Menu, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface NavbarProps {
  onOpenTestDrive: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTestDrive }) => {
  const [scrolled, setScrolled] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const isRunning = soundEngine.toggleEngine();
    setAudioActive(isRunning);
  };

  const navLinks = [
    { name: 'Overview', href: '#hero' },
    { name: 'Aero Tech', href: '#aerodynamics' },
    { name: 'Sound Engine', href: '#rev-studio' },
    { name: 'Studio Config', href: '#customizer' },
    { name: 'Models', href: '#lineup' },
    { name: 'Launch Simulator', href: '#launch-control' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#07090D]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-[#07090D]/90 via-[#07090D]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Porsche Brand Crest & Title */}
          <a href="#hero" className="flex items-center gap-3 group cursor-pointer">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 via-black to-[#00F2FE] p-[1px] shadow-[0_0_15px_rgba(225,6,0,0.4)] group-hover:shadow-[0_0_25px_rgba(0,242,254,0.6)] transition-all duration-300"
            >
              <div className="w-full h-full bg-[#0B0E17] rounded-[7px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#E10600] group-hover:text-[#00F2FE] transition-colors duration-300 fill-[#E10600]/20" />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-widest text-white uppercase group-hover:text-[#00F2FE] transition-colors">
                PORSCHE
              </span>
              <span className="text-[9px] font-mono tracking-[0.3em] text-gray-400 group-hover:text-white uppercase transition-colors">
                E-PERFORMANCE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 glass-card px-4 py-1.5 rounded-full border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium tracking-wider text-gray-300 hover:text-white uppercase transition-all duration-200 hover:bg-white/10 rounded-full cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Audio Engine Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSound}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border cursor-pointer ${
                audioActive
                  ? 'bg-red-950/40 border-red-500/60 text-red-400 shadow-[0_0_15px_rgba(225,6,0,0.4)] animate-pulse'
                  : 'bg-white/5 border-white/15 text-gray-400 hover:text-white hover:border-white/40'
              }`}
              title="Toggle Acoustic Engine Audio"
            >
              {audioActive ? (
                <>
                  <Volume2 className="w-4 h-4 text-red-500 animate-bounce" />
                  <span className="text-[10px]">SOUND: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="text-[10px]">SOUND: OFF</span>
                </>
              )}
            </motion.button>

            {/* Test Drive CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenTestDrive}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E10600] to-red-700 text-white font-display text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(225,6,0,0.5)] hover:shadow-[0_0_30px_rgba(225,6,0,0.85)] transition-all duration-300 group overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                RESERVE DRIVE
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00F2FE] to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-white/10 text-white cursor-pointer"
            >
              {audioActive ? <Volume2 className="w-4 h-4 text-red-500" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#07090D]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-white uppercase"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTestDrive();
            }}
            className="w-full mt-4 py-3 rounded-full bg-[#E10600] text-white font-display text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
          >
            RESERVE DRIVE
          </button>
        </div>
      )}
    </header>
  );
};

