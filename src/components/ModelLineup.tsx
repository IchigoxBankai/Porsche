import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAR_MODELS } from '../utils/carData';
import type { CarModel } from '../utils/carData';
import { ChevronRight, X, Shield, ArrowUpRight } from 'lucide-react';

interface ModelLineupProps {
  onOpenTestDrive: () => void;
}

export const ModelLineup: React.FC<ModelLineupProps> = ({ onOpenTestDrive }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalModel, setActiveModalModel] = useState<CarModel | null>(null);

  const categories = ['All', 'Hypercar', 'E-Performance', 'Track', 'Heritage'];

  const filteredModels =
    selectedCategory === 'All'
      ? CAR_MODELS
      : CAR_MODELS.filter((m) => m.category === selectedCategory);

  return (
    <section
      id="lineup"
      className="relative min-h-screen py-24 bg-[#07090D] border-t border-white/5 cyber-grid overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-400 shadow-[0_0_15px_rgba(225,6,0,0.2)]">
            <Shield className="w-3.5 h-3.5 text-red-500" />
            THE PORSCHE FLEET
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            HIGH PERFORMANCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#E10600]">LINEUP</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base font-light">
            Explore our championship-winning flagship series: from all-electric Taycan Turbo GT to naturally aspirated 911 GT3 RS track machines.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-mono text-xs font-bold uppercase transition-all duration-300 border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#E10600] border-[#E10600] text-white shadow-[0_0_20px_rgba(225,6,0,0.5)]'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Car Models Grid with Animated Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredModels.map((model) => (
              <motion.div
                key={model.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between group relative overflow-hidden shadow-xl hover:border-[#00F2FE]/40 hover:shadow-[0_15px_35px_rgba(0,242,254,0.15)] transition-all duration-300"
              >
                {/* Background Glow */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-20 group-hover:opacity-45 transition-opacity"
                  style={{ backgroundColor: model.accentColor }}
                />

                {/* Card Top Info */}
                <div className="flex items-start justify-between z-10">
                  <div>
                    <span
                      className="text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded bg-white/5 border border-white/10"
                      style={{ color: model.accentColor }}
                    >
                      {model.category}
                    </span>
                    <h3 className="font-display text-2xl font-black text-white uppercase mt-2 group-hover:text-[#00F2FE] transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 mt-0.5">{model.tagline}</p>
                  </div>
                  <span className="font-mono text-sm font-bold text-white bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {model.price}
                  </span>
                </div>

                {/* Car Image Preview with Float Effect */}
                <div className="relative my-6 w-full h-48 sm:h-56 flex items-center justify-center">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="max-h-full w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                {/* Key Specs Bar */}
                <div className="grid grid-cols-3 gap-2 py-4 border-t border-white/10 text-center text-xs font-mono z-10">
                  <div>
                    <span className="text-gray-400 block text-[10px]">POWER</span>
                    <span className="text-white font-bold">{model.hp} PS</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">0-60 MPH</span>
                    <span className="text-cyan-400 font-bold">{model.zeroToSixty}s</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">TOP SPEED</span>
                    <span className="text-amber-400 font-bold">{model.topSpeed} MPH</span>
                  </div>
                </div>

                {/* Card Footer CTAs */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 z-10">
                  <button
                    onClick={() => setActiveModalModel(model)}
                    className="flex items-center gap-1.5 text-xs font-mono text-gray-300 hover:text-[#00F2FE] transition-colors cursor-pointer"
                  >
                    <span>VIEW FULL SPECS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onOpenTestDrive}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#E10600] text-white text-xs font-display font-bold uppercase transition-all duration-300 flex items-center gap-1 group/btn cursor-pointer"
                  >
                    <span>RESERVE</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Model Detail Popup Modal */}
      <AnimatePresence>
        {activeModalModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="glass-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-white/20 relative space-y-6 shadow-2xl"
            >
              <button
                onClick={() => setActiveModalModel(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-mono text-[#00F2FE] uppercase tracking-wider font-bold">
                  {activeModalModel.category} TECHNICAL MANIFEST
                </span>
                <h3 className="font-display text-3xl font-black text-white uppercase">
                  {activeModalModel.name}
                </h3>
                <p className="text-xs font-mono text-gray-400">{activeModalModel.tagline}</p>
              </div>

              <img
                src={activeModalModel.image}
                alt={activeModalModel.name}
                className="w-full h-48 object-contain my-4 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]"
              />

              <p className="text-sm font-sans text-gray-300 leading-relaxed">
                {activeModalModel.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {activeModalModel.features.map((feat, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE]" />
                    {feat}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="font-display text-lg font-bold text-white">
                  {activeModalModel.price}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveModalModel(null);
                    onOpenTestDrive();
                  }}
                  className="px-6 py-3 rounded-full bg-[#E10600] text-white font-display text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
                >
                  BOOK TEST DRIVE
                </motion.button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

