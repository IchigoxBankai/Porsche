import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Gauge, Compass, Flame, ArrowUpRight } from 'lucide-react';

export const SpecsGrid: React.FC = () => {
  const specs = [
    {
      title: 'SYSTEM POWER',
      value: '1,520',
      unit: 'PS',
      desc: 'Quad e-motor vector drive powertrain delivering 1:1 power-to-weight ratio.',
      icon: Flame,
      color: '#00F2FE',
    },
    {
      title: 'ACCELERATION',
      value: '1.79',
      unit: 'SEC',
      desc: '0 to 60 mph sprint time using launch control with active torque vectoring.',
      icon: Gauge,
      color: '#E10600',
    },
    {
      title: 'AERO DOWNFORCE',
      value: '860',
      unit: 'KG',
      desc: 'Pushed downward at 177 mph via active DRS rear spoiler & underbody diffuser.',
      icon: Compass,
      color: '#D4AF37',
    },
    {
      title: 'CHARGING SPEED',
      value: '900',
      unit: 'VOLT',
      desc: 'High-voltage system charging from 10% to 80% state of charge in 12 minutes.',
      icon: Zap,
      color: '#38EF7D',
    },
  ];

  return (
    <section className="py-20 bg-[#07090D] border-t border-white/5 cyber-grid overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col justify-between space-y-4 shadow-xl group transition-all duration-300 hover:border-[#00F2FE]/50 hover:shadow-[0_15px_30px_rgba(0,242,254,0.15)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">
                    {spec.title}
                  </span>
                  <div
                    className="p-2.5 rounded-xl bg-white/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    style={{ color: spec.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-4xl font-black text-white group-hover:text-[#00F2FE] transition-colors duration-300">
                      {spec.value}
                    </span>
                    <span className="text-sm font-mono font-bold" style={{ color: spec.color }}>
                      {spec.unit}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-gray-400 mt-2 leading-relaxed">
                    {spec.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-500 group-hover:text-white transition-colors duration-300">
                  <span>PORSCHE SPEC</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

