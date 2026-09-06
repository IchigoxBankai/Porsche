import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';
import { RotateCcw, Award, Sparkles } from 'lucide-react';

export const LaunchControl: React.FC = () => {
  const [stage, setStage] = useState<'IDLE' | 'ARMED' | 'COUNTDOWN' | 'LAUNCHED' | 'FINISHED'>('IDLE');
  const [countdown, setCountdown] = useState(3);
  const [speed, setSpeed] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gForce, setGForce] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Arm Launch Control
  const handleArmLaunch = () => {
    soundEngine.startEngine();
    soundEngine.setRpm(4500); // Building launch rev boost
    setStage('ARMED');
  };

  // Start Countdown Sequence
  const handleStartLaunch = () => {
    setStage('COUNTDOWN');
    setCountdown(3);

    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      soundEngine.setRpm(4000 + (3 - current) * 1500);
      if (current === 0) {
        clearInterval(interval);
        triggerLaunch();
      } else {
        setCountdown(current);
      }
    }, 800);
  };

  // Execute Launch Simulation
  const triggerLaunch = () => {
    setStage('LAUNCHED');
    soundEngine.setRpm(11500);

    const startTime = performance.now();
    const duration = 1790; // 1.79s duration

    const updateLaunch = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      const currentSpeed = Math.floor(progress * 60);
      const currentG = parseFloat((1.8 * Math.sin(progress * Math.PI)).toFixed(2));

      setSpeed(currentSpeed);
      setGForce(currentG);
      setElapsedTime(parseFloat((elapsed / 1000).toFixed(2)));

      if (progress < 1) {
        requestAnimationFrame(updateLaunch);
      } else {
        setStage('FINISHED');
        soundEngine.playGearShiftPop();
        // Confetti celebration
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00F2FE', '#E10600', '#D4AF37', '#ffffff'],
        });
      }
    };

    requestAnimationFrame(updateLaunch);
  };

  const handleReset = () => {
    setStage('IDLE');
    setSpeed(0);
    setElapsedTime(0);
    setGForce(0);
    soundEngine.setRpm(1000);
  };

  return (
    <section
      id="launch-control"
      ref={containerRef}
      className="relative min-h-screen py-24 bg-[#0B0D14] border-t border-white/5 cyber-grid flex flex-col justify-center overflow-hidden"
    >
      {/* Launch Flash Background Glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
          stage === 'LAUNCHED' ? 'bg-cyan-500/25' : stage === 'FINISHED' ? 'bg-red-600/20' : 'opacity-0'
        }`}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            INTERACTIVE SIMULATION
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            0-60 MPH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] via-cyan-300 to-[#E10600]">LAUNCH CONTROL</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base font-light max-w-2xl mx-auto">
            Test Porsche Mission X vector traction & instant torque. Arm launch control and feel the 1.79-second sprint to 60 MPH.
          </p>
        </motion.div>

        {/* Launch Control Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`glass-card rounded-3xl p-8 sm:p-12 border border-white/15 shadow-2xl relative space-y-8 ${
            stage === 'LAUNCHED' ? 'animate-engine' : ''
          }`}
        >
          
          {/* Top Status HUD */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs font-mono">
            <span className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  stage === 'IDLE'
                    ? 'bg-gray-500'
                    : stage === 'ARMED'
                    ? 'bg-amber-400 animate-pulse'
                    : stage === 'COUNTDOWN'
                    ? 'bg-[#00F2FE] animate-ping'
                    : 'bg-red-500 animate-bounce'
                }`}
              />
              STATUS: <strong className="text-white">{stage}</strong>
            </span>
            <span className="text-gray-400">TRACTION MANAGEMENT: ACTIVE</span>
          </div>

          {/* Center Digital Telemetry Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-4">
            
            {/* Speed Gauge */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center shadow-lg"
            >
              <span className="text-xs font-mono text-gray-400 uppercase">SPEED</span>
              <span className="font-display text-5xl sm:text-6xl font-black text-white my-2 tracking-tight text-glow">
                {speed}
              </span>
              <span className="text-xs font-mono text-[#00F2FE] font-bold">MPH</span>
            </motion.div>

            {/* Elapsed Time Gauge */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center shadow-lg"
            >
              <span className="text-xs font-mono text-gray-400 uppercase">0-60 TIMER</span>
              <span className="font-display text-5xl sm:text-6xl font-black text-amber-400 my-2 tracking-tight">
                {elapsedTime}
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">SECONDS</span>
            </motion.div>

            {/* G-Force Gauge */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center shadow-lg"
            >
              <span className="text-xs font-mono text-gray-400 uppercase">ACCELERATION FORCE</span>
              <span className="font-display text-5xl sm:text-6xl font-black text-red-500 my-2 tracking-tight">
                {gForce}
              </span>
              <span className="text-xs font-mono text-red-500 font-bold">G-FORCE</span>
            </motion.div>

          </div>

          {/* Stage Action Controls */}
          <div className="flex flex-col items-center justify-center gap-4 pt-4">
            {stage === 'IDLE' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleArmLaunch}
                className="px-10 py-5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-display text-sm font-black uppercase tracking-widest shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:shadow-[0_0_40px_rgba(245,158,11,0.9)] transition-all cursor-pointer"
              >
                ARM LAUNCH CONTROL
              </motion.button>
            )}

            {stage === 'ARMED' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartLaunch}
                className="px-10 py-5 rounded-full bg-gradient-to-r from-[#00F2FE] to-cyan-600 text-black font-display text-sm font-black uppercase tracking-widest shadow-[0_0_35px_rgba(0,242,254,0.85)] transition-all animate-pulse cursor-pointer"
              >
                PRESS TO LAUNCH!
              </motion.button>
            )}

            {stage === 'COUNTDOWN' && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={countdown}
                  initial={{ opacity: 0, scale: 2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-7xl sm:text-8xl font-black text-[#00F2FE] text-glow tracking-widest"
                >
                  {countdown}
                </motion.div>
              </AnimatePresence>
            )}

            {stage === 'LAUNCHED' && (
              <div className="font-display text-3xl sm:text-4xl font-black text-red-500 animate-bounce tracking-widest text-glow-red">
                LAUNCHING...
              </div>
            )}

            {stage === 'FINISHED' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-mono text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <Award className="w-4 h-4 text-emerald-400 animate-bounce" />
                  NEW RECORD: 0-60 MPH IN 1.79 SECONDS!
                </div>
                <div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                  >
                    <RotateCcw className="w-4 h-4" />
                    AGAIN / RESET
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

        </motion.div>

      </div>
    </section>
  );
};

