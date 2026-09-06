import React from 'react';
import { Shield, ChevronUp, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05060A] text-gray-400 border-t border-white/10 relative overflow-hidden">
      
      {/* Glow Line Top Accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#00F2FE] to-[#E10600]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Col (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-[#00F2FE] p-[1px] shadow-lg">
                <div className="w-full h-full bg-[#0B0E17] rounded-[7px] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#E10600]" />
                </div>
              </div>
              <span className="font-display font-black text-xl text-white tracking-widest uppercase">
                PORSCHE <span className="text-[#00F2FE]">E-PERFORMANCE</span>
              </span>
            </div>

            <p className="text-xs font-sans leading-relaxed text-gray-400 max-w-sm">
              Shaping the future of the sportscar. Engineered with active aerodynamics, 900V high-voltage charging architecture, and 1,520 PS hypercar performance.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-mono text-emerald-400">
                SYSTEM ONLINE // GSAP ScrollTrigger Enabled
              </span>
            </div>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-white font-bold tracking-widest uppercase block mb-2">
              HYPERCAR FLEET
            </span>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-[#00F2FE] transition-colors">Mission X Concept</a></li>
              <li><a href="#lineup" className="hover:text-[#00F2FE] transition-colors">Taycan Turbo GT</a></li>
              <li><a href="#lineup" className="hover:text-[#00F2FE] transition-colors">911 GT3 RS Weissach</a></li>
              <li><a href="#customizer" className="hover:text-[#00F2FE] transition-colors">Studio Configurator</a></li>
              <li><a href="#rev-studio" className="hover:text-[#00F2FE] transition-colors">Sound Engine Studio</a></li>
            </ul>
          </div>

          {/* Newsletter Subscribe (4 Cols) */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-white font-bold tracking-widest uppercase block mb-2">
              PORSCHE INSIDER BULLETIN
            </span>
            <p className="text-gray-400 text-[11px] font-sans">
              Receive confidential updates on track test days, software updates, and hypercar delivery schedules.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Subscribed to Porsche Insider Bulletin.');
              }}
              className="flex items-center gap-2 pt-1"
            >
              <input
                type="email"
                required
                placeholder="enter email..."
                className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00F2FE] w-full text-xs"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-[#E10600] text-white hover:bg-red-700 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Disclaimer & Back to Top */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-gray-500">
          <p>© 2026 Porsche E-Performance Showcase. Built with React, GSAP, Tailwind CSS, & Web Audio API.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:border-[#00F2FE] hover:text-[#00F2FE] transition-colors"
          >
            <span>BACK TO TOP</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
