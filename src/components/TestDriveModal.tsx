import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, Shield, CheckCircle, ChevronRight } from 'lucide-react';
import { CAR_MODELS } from '../utils/carData';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    model: 'mission-x',
    location: 'Porsche Center Experience Center',
    date: '2026-09-15',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#00F2FE', '#E10600', '#D4AF37'],
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glass-card max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-white/20 relative shadow-2xl"
        >
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.4)] animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  RESERVATION CONFIRMED
                </span>
                <h3 className="font-display text-2xl font-black text-white uppercase">
                  TEST DRIVE SCHEDULED
                </h3>
                <p className="text-sm text-gray-300 font-sans max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. A Porsche Concierge specialist will contact you shortly to confirm your private track session.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-8 py-3 rounded-full bg-[#E10600] text-white font-display text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
              >
                CLOSE WINDOW
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE] uppercase font-bold">
                  <Shield className="w-3.5 h-3.5" />
                  PRIVATE CONCIERGE BOOKING
                </div>
                <h3 className="font-display text-2xl font-black text-white uppercase">
                  RESERVE A <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#E10600]">PORSCHE EXPERIENCE</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Experience track-focused electric hypercar telemetry firsthand at a Porsche Experience Center.
                </p>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <label className="block text-gray-300 mb-1">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ferdinand Porsche"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00F2FE] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 mb-1">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      placeholder="ferdinand@porsche.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00F2FE] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">PHONE NUMBER *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00F2FE] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 mb-1">PREFERRED MODEL</label>
                    <select
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#121620] border border-white/10 text-white focus:outline-none focus:border-[#00F2FE] transition-colors cursor-pointer"
                    >
                      {CAR_MODELS.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.hp} PS)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">PREFERRED DATE</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00F2FE] transition-colors cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-[#E10600] text-white font-display text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(225,6,0,0.5)] hover:shadow-[0_0_30px_rgba(225,6,0,0.8)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CONFIRM DRIVE RESERVATION</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

