import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AERO_HOTSPOTS } from '../utils/carData';
import { Activity, ShieldAlert, Cpu, Sparkles, Wind } from 'lucide-react';

export const AerodynamicsScroll: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState(AERO_HOTSPOTS[0]);
  const [windTunnelActive, setWindTunnelActive] = useState(true);

  return (
    <section
      id="aerodynamics"
      className="relative min-h-screen py-24 bg-[#0B0D14] overflow-hidden border-t border-white/5"
    >
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            TELEMETRY & CHASSIS MATRIX
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            ACTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-cyan-400">AERODYNAMICS</span> & CHASSIS
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base font-light">
            Select interactive hotspots below to inspect active rear wing DRS mechanics, lithium cooling tunnels, and carbon-ceramic brakes.
          </p>
        </motion.div>

        {/* Blueprint Visual & Hotspots Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Blueprint Canvas (Left 8 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-8 relative rounded-3xl glass-card border border-white/10 p-4 sm:p-8 overflow-hidden shadow-2xl"
          >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
            
            {/* Laser Scanline Beam Effect */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent shadow-[0_0_15px_#00F2FE] opacity-60 animate-scanline pointer-events-none z-10" />

            {/* Blueprint Header HUD bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-cyan-400">
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                TELEMETRY INSPECTOR // ACTIVE
              </span>
              <button
                onClick={() => setWindTunnelActive(!windTunnelActive)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-[11px] hover:border-cyan-400 transition-colors cursor-pointer"
              >
                <Wind className={`w-3.5 h-3.5 ${windTunnelActive ? 'text-[#00F2FE] animate-pulse' : 'text-gray-500'}`} />
                <span>WIND TUNNEL: {windTunnelActive ? 'FLOW ON' : 'PAUSED'}</span>
              </button>
            </div>

            {/* Car Blueprint Image with Hotspot Pins */}
            <div className="relative w-full my-6 flex items-center justify-center">
              <img
                src="/images/aero_blueprint.png"
                alt="Porsche Aerodynamics Blueprint"
                className="w-full h-auto object-contain rounded-xl drop-shadow-[0_0_30px_rgba(0,242,254,0.35)]"
              />

              {/* Animated Wind Airflow Stream Overlay */}
              {windTunnelActive && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-[#00F2FE]/10 to-transparent animate-shimmer" />
                </div>
              )}

              {/* Hotspot Pins Overlay */}
              {AERO_HOTSPOTS.map((hotspot) => {
                const isActive = activeHotspot.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    onClick={() => setActiveHotspot(hotspot)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer z-20"
                    style={{ left: hotspot.x, top: hotspot.y }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.25 }}
                      whileTap={{ scale: 0.9 }}
                      className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-[#00F2FE] text-black shadow-[0_0_25px_#00F2FE] scale-125 font-black'
                          : 'bg-black/80 border border-[#00F2FE] text-[#00F2FE] hover:bg-[#00F2FE]/40'
                      }`}
                    >
                      <span className="font-mono text-xs font-bold">{hotspot.id}</span>
                      
                      {/* Pulse Wave Ring */}
                      <span className="absolute inset-0 rounded-full border border-[#00F2FE] animate-ping opacity-75 pointer-events-none" />
                    </motion.div>

                    {/* Hover Title Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-black/95 text-cyan-300 text-[11px] font-mono px-3 py-1 rounded-md border border-cyan-500/50 shadow-xl">
                      {hotspot.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Wind Tunnel Flow Direction Indicator */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[11px] font-mono text-gray-400">
              <span className="text-cyan-400 font-bold">DRAG COEFFICIENT: Cd 0.28</span>
              <span className="text-amber-400 font-bold">DOWNFORCE: 860 KG</span>
            </div>
          </motion.div>

          {/* Hotspot Inspector Panel (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Active Feature Detail Card with Smooth AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 rounded-3xl border-l-4 border-l-[#00F2FE] space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#00F2FE]/15 text-[#00F2FE] text-[10px] font-mono uppercase tracking-wider font-bold border border-[#00F2FE]/30">
                    MODULE #{activeHotspot.id}
                  </span>
                  <Cpu className="w-5 h-5 text-[#00F2FE] animate-pulse" />
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-white uppercase">
                    {activeHotspot.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 mt-0.5">
                    {activeHotspot.subtitle}
                  </p>
                </div>

                <p className="text-gray-300 font-sans text-sm leading-relaxed">
                  {activeHotspot.description}
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">STATUS</span>
                  <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    OPTIMAL EFFICIENCY
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Select Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {AERO_HOTSPOTS.map((hotspot) => (
                <motion.button
                  key={hotspot.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveHotspot(hotspot)}
                  className={`p-3 rounded-2xl text-left transition-all duration-300 border text-xs font-mono cursor-pointer ${
                    activeHotspot.id === hotspot.id
                      ? 'bg-cyan-950/80 border-[#00F2FE] text-white shadow-[0_0_20px_rgba(0,242,254,0.3)] font-bold'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  <div className="font-bold text-[#00F2FE]">#{hotspot.id}</div>
                  <div className="truncate text-[11px] font-sans mt-0.5">{hotspot.title}</div>
                </motion.button>
              ))}
            </div>

            <div className="glass-card p-4 rounded-2xl flex items-center gap-3 border border-amber-500/30 bg-amber-500/10">
              <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <p className="text-[11px] font-sans text-amber-200/90 leading-tight">
                Weissach Package includes active rear wing flap with Drag Reduction System (DRS) integration.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

