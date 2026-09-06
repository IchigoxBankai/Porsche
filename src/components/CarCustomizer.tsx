import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLOR_OPTIONS } from '../utils/carData';
import { Palette, Disc, Sparkles, Check, Download } from 'lucide-react';

export const CarCustomizer: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedWheel, setSelectedWheel] = useState('Magnesium Weissach 21"');
  const [carbonAeroPackage, setCarbonAeroPackage] = useState(true);
  const [interiorTrim] = useState('Alcantara & Acid Green');
  const [savedBanner, setSavedBanner] = useState(false);

  const wheels = [
    { name: 'Magnesium Weissach 21"', price: 'Standard' },
    { name: 'Carbon Fiber Lightweight 20"', price: '+$9,500' },
    { name: 'Turbo GT Forged Monobloc', price: '+$6,200' },
  ];

  const handleSaveConfig = () => {
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  return (
    <section
      id="customizer"
      className="relative min-h-screen py-24 bg-[#0B0D14] border-t border-white/5 cyber-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Palette className="w-3.5 h-3.5" />
            PORSCHE EXCLUSIVE MANUFAKTUR
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            STUDIO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] via-cyan-300 to-white">CUSTOMIZER</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base font-light">
            Configure your bespoke Mission X hypercar. Select paint finishes, carbon aero packages, and magnesium wheel forged specs.
          </p>
        </motion.div>

        {/* Customizer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Studio Stage Car View (Left 7 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative flex flex-col items-center justify-center glass-card rounded-3xl p-6 sm:p-10 border border-white/10 overflow-hidden shadow-2xl min-h-[420px]"
          >
            
            {/* Paint Finish Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-white/15 text-xs font-mono text-white shadow-md z-10">
              <span className="w-3 h-3 rounded-full border border-white/40 shadow-sm" style={{ backgroundColor: selectedColor.hex }} />
              <span>FINISH: {selectedColor.name.toUpperCase()}</span>
            </div>

            {/* Dynamic Ambient Background Glow based on selected paint color */}
            <div
              className="absolute w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-60"
              style={{ backgroundColor: selectedColor.glowHex }}
            />

            {/* Car Image with CSS Paint Filter */}
            <div className="relative w-full max-w-xl my-8 transition-all duration-500">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedColor.id}
                  initial={{ opacity: 0.8, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src="/images/car_side_profile.png"
                  alt="Porsche Studio Customizer Car"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)]"
                  style={{
                    filter: selectedColor.filterStyle || 'none',
                  }}
                />
              </AnimatePresence>

              {/* Floor Spotlight Effect */}
              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-10 blur-xl rounded-full opacity-75 transition-all duration-500"
                style={{ backgroundColor: selectedColor.glowHex }}
              />
            </div>

            {/* Configured Car Specs Summary */}
            <div className="w-full grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center text-xs font-mono z-10">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-gray-400 block text-[10px]">WHEELS</span>
                <span className="text-white font-bold truncate block">{selectedWheel.split(' ')[0]}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-gray-400 block text-[10px]">CARBON AERO</span>
                <span className="text-[#00F2FE] font-bold block">{carbonAeroPackage ? 'ACTIVE' : 'STANDARD'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-gray-400 block text-[10px]">INTERIOR</span>
                <span className="text-amber-400 font-bold truncate block">{interiorTrim.split(' ')[0]}</span>
              </div>
            </div>

          </motion.div>

          {/* Configuration Options Control Panel (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Paint Color Options */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#00F2FE]" />
                  EXTERIOR PAINT FINISH
                </span>
                <span className="text-xs font-mono text-[#00F2FE] font-bold">{selectedColor.name}</span>
              </div>

              <div className="flex items-center space-x-3">
                {COLOR_OPTIONS.map((color) => (
                  <motion.button
                    key={color.id}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer ${
                      selectedColor.id === color.id
                        ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-[#07090D] shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor.id === color.id && (
                      <Check className={`w-4 h-4 ${color.id === 'silver' ? 'text-black' : 'text-white'}`} />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 2. Wheel Packages */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 shadow-xl">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Disc className="w-4 h-4 text-amber-400" />
                WHEELS & TIRES PACKAGE
              </span>

              <div className="space-y-2">
                {wheels.map((wheel) => (
                  <motion.button
                    key={wheel.name}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedWheel(wheel.name)}
                    className={`w-full p-3 rounded-2xl flex items-center justify-between text-xs font-mono transition-all duration-200 border cursor-pointer ${
                      selectedWheel === wheel.name
                        ? 'bg-amber-950/40 border-amber-500 text-white shadow-[0_0_15px_rgba(212,175,55,0.2)] font-bold'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{wheel.name}</span>
                    <span className="text-amber-400 font-bold">{wheel.price}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 3. Carbon Aero Package Toggle */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 flex items-center justify-between shadow-xl">
              <div>
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
                  CARBON WEISSACH AERO WING
                </span>
                <span className="text-xs text-gray-300 font-sans mt-0.5 block">
                  Adds DRS rear spoiler & carbon front diffusers
                </span>
              </div>

              <button
                onClick={() => setCarbonAeroPackage(!carbonAeroPackage)}
                className={`w-14 h-8 rounded-full transition-colors duration-300 p-1 flex items-center cursor-pointer ${
                  carbonAeroPackage ? 'bg-[#00F2FE] justify-end' : 'bg-gray-700 justify-start'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-black shadow-md flex items-center justify-center">
                  {carbonAeroPackage && <Sparkles className="w-3 h-3 text-[#00F2FE]" />}
                </div>
              </button>
            </div>

            {/* Save Spec Sheet Banner Confirmation */}
            {savedBanner && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono text-center flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>SPEC MANIFEST SAVED: {selectedColor.name} Mission X with {selectedWheel}.</span>
              </motion.div>
            )}

            {/* Download Spec Sheet Action */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveConfig}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00F2FE] via-cyan-500 to-blue-600 text-black font-display text-xs font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(0,242,254,0.5)] hover:shadow-[0_0_40px_rgba(0,242,254,0.85)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>SAVE CONFIGURATION SUMMARY</span>
            </motion.button>

          </div>

        </div>

      </div>
    </section>
  );
};

