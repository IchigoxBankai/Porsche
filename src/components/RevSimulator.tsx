import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../utils/soundEngine';
import { Volume2, Flame, Gauge, Play, Pause, Activity } from 'lucide-react';

export const RevSimulator: React.FC = () => {
  const [isEngineOn, setIsEngineOn] = useState(false);
  const [rpm, setRpm] = useState(800); // 800 RPM idle
  const [currentGear, setCurrentGear] = useState('N');
  const [driveMode, setDriveMode] = useState<'Comfort' | 'Sport Plus' | 'Attack Mode'>('Sport Plus');
  const [isPedalPressed, setIsPedalPressed] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Toggle Engine Power
  const handleToggleEngine = () => {
    const running = soundEngine.toggleEngine();
    setIsEngineOn(running);
    if (running) {
      setRpm(1000);
      setCurrentGear('1');
    } else {
      setRpm(0);
      setCurrentGear('N');
    }
  };

  // Pedal Press & Rev Logic
  useEffect(() => {
    let interval: any;
    if (isPedalPressed && isEngineOn) {
      interval = setInterval(() => {
        setRpm((prevRpm) => {
          const nextRpm = Math.min(11800, prevRpm + 380);
          soundEngine.setRpm(nextRpm);

          // Gear shifting simulation
          if (nextRpm > 9500 && currentGear === '1') {
            setCurrentGear('2');
            soundEngine.playGearShiftPop();
          } else if (nextRpm > 11000 && currentGear === '2') {
            setCurrentGear('3');
            soundEngine.playGearShiftPop();
          }

          return nextRpm;
        });
      }, 25);
    } else if (isEngineOn) {
      // Decay back to idle (1,000 RPM)
      interval = setInterval(() => {
        setRpm((prevRpm) => {
          if (prevRpm <= 1000) return 1000;
          const nextRpm = Math.max(1000, prevRpm - 480);
          soundEngine.setRpm(nextRpm);
          if (nextRpm < 6000 && currentGear !== '1') {
            setCurrentGear('1');
          }
          return nextRpm;
        });
      }, 25);
    }

    return () => clearInterval(interval);
  }, [isPedalPressed, isEngineOn, currentGear]);

  // Audio Spectrum Visualizer Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Draw audio frequency wave sync'd to RPM
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = isEngineOn ? '#00F2FE' : '#334155';

      const amplitude = isEngineOn ? (rpm / 12000) * (height / 2.2) + 5 : 2;
      const frequency = isEngineOn ? (rpm / 12000) * 0.12 + 0.02 : 0.01;

      for (let x = 0; x < width; x += 3) {
        const y = height / 2 + Math.sin(x * frequency + phase) * amplitude * Math.sin((x / width) * Math.PI);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second harmonic wave
      if (isEngineOn) {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = rpm > 8000 ? '#E10600' : 'rgba(212, 175, 55, 0.8)';
        for (let x = 0; x < width; x += 4) {
          const y = height / 2 + Math.cos(x * frequency * 1.6 - phase) * (amplitude * 0.65) * Math.sin((x / width) * Math.PI);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      phase += 0.18;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isEngineOn, rpm]);

  // Calculate needle rotation angle (-120deg to 120deg)
  const needleRotation = -120 + (rpm / 12000) * 240;

  return (
    <section
      id="rev-studio"
      className="relative min-h-screen py-24 bg-[#07090D] overflow-hidden border-t border-white/5 cyber-grid flex flex-col justify-center"
    >
      {/* Background glow when revving high */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${
            rpm > 8000 ? 'rgba(225,6,0,0.3)' : 'rgba(0,242,254,0.18)'
          } 0%, transparent 70%)`,
          opacity: isEngineOn ? rpm / 12000 : 0,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/40 text-xs font-mono text-red-400 shadow-[0_0_15px_rgba(225,6,0,0.2)]">
            <Volume2 className="w-3.5 h-3.5 animate-bounce text-red-500" />
            WEB AUDIO ACOUSTIC SYNTHESIZER
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            PORSCHE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-[#E10600] to-amber-500">SOUND ENGINE</span> & REV STUDIO
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base font-light">
            Press & hold the accelerator pedal below to rev up the dual-electric & V8 acoustic synthesizer. Feel the rev limiter at 12,000 RPM.
          </p>
        </motion.div>

        {/* Studio Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Tachometer Dial (Center 7 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`lg:col-span-7 flex flex-col items-center justify-center glass-card rounded-3xl p-6 sm:p-10 border border-white/10 relative shadow-2xl ${
              rpm > 7000 ? 'animate-engine' : ''
            }`}
          >
            
            {/* Gear & RPM Digital Readout Overlay */}
            <div className="absolute top-6 left-6 flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-gray-400">MODE:</span>
                <span className="text-[#00F2FE] font-bold">{driveMode}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-gray-400">GEAR:</span>
                <span className="text-amber-400 font-bold text-sm">{currentGear}</span>
              </div>
            </div>

            {/* Tachometer Circle */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-6">
              
              {/* Outer Gauge Ring with RPM numbers */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {/* Background Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="400"
                  strokeDashoffset="100"
                />
                {/* Active RPM Gauge Fill */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke={rpm > 9500 ? '#E10600' : '#00F2FE'}
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="400"
                  strokeDashoffset={400 - (rpm / 12000) * 300}
                  className="transition-all duration-150 ease-out"
                  strokeLinecap="round"
                />
              </svg>

              {/* Center Digital RPM Display */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">ENGINE SPEED</span>
                <span className={`font-display text-4xl sm:text-5xl font-black text-white tracking-wider my-1 ${rpm > 9500 ? 'text-glow-red text-red-500' : ''}`}>
                  {rpm.toLocaleString()}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">RPM</span>
              </div>

              {/* Rotating Tachometer Needle */}
              <div
                className="absolute w-full h-full flex items-center justify-center transition-transform duration-100 ease-out pointer-events-none"
                style={{ transform: `rotate(${needleRotation}deg)` }}
              >
                <div className="w-1.5 h-32 sm:h-40 bg-gradient-to-t from-transparent via-[#E10600] to-white rounded-full shadow-[0_0_20px_#E10600] origin-center -translate-y-12 sm:-translate-y-16" />
              </div>
            </div>

            {/* Audio Wave Visualizer Canvas */}
            <div className="w-full h-16 bg-black/50 rounded-xl overflow-hidden border border-white/10 relative flex items-center px-4 mt-2">
              <canvas ref={canvasRef} width={600} height={64} className="w-full h-full" />
              <div className="absolute right-3 top-2 flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
                <Activity className="w-3.5 h-3.5 text-[#00F2FE]" />
                SYNTH AUDIO WAVE
              </div>
            </div>

          </motion.div>

          {/* Interactive Controls & Throttle Pedal (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Engine Power Switch */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-6 rounded-3xl border border-white/10 flex items-center justify-between shadow-xl"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-white uppercase">
                  ENGINE IGNITION
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  {isEngineOn ? 'Web Audio Engine Active' : 'Engine System Standby'}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleEngine}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer ${
                  isEngineOn
                    ? 'bg-red-600 text-white shadow-[0_0_25px_rgba(225,6,0,0.6)] animate-pulse'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {isEngineOn ? (
                  <>
                    <Pause className="w-4 h-4" />
                    STOP ENGINE
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    START ENGINE
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Drive Mode Selector */}
            <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block">
                DRIVE PROFILE TUNE
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['Comfort', 'Sport Plus', 'Attack Mode'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setDriveMode(mode)}
                    className={`py-2.5 px-2 rounded-xl text-center text-xs font-mono font-bold uppercase transition-all duration-200 border cursor-pointer ${
                      driveMode === mode
                        ? 'bg-[#00F2FE]/20 border-[#00F2FE] text-white shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* THROTTLE ACCELERATOR PEDAL (Hold to Rev) */}
            <div className="glass-card p-8 rounded-3xl border border-red-500/30 bg-gradient-to-b from-red-950/20 to-transparent flex flex-col items-center justify-center space-y-4 text-center">
              <span className="text-xs font-mono text-red-400 tracking-widest uppercase flex items-center gap-1.5">
                <Flame className="w-4 h-4 animate-bounce text-red-500" />
                PRESS & HOLD TO REV ENGINE
              </span>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onMouseDown={() => setIsPedalPressed(true)}
                onMouseUp={() => setIsPedalPressed(false)}
                onMouseLeave={() => setIsPedalPressed(false)}
                onTouchStart={() => setIsPedalPressed(true)}
                onTouchEnd={() => setIsPedalPressed(false)}
                disabled={!isEngineOn}
                className={`w-full py-6 rounded-2xl font-display text-base font-black uppercase tracking-widest transition-all duration-150 shadow-2xl flex flex-col items-center justify-center gap-1 cursor-pointer select-none ${
                  !isEngineOn
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                    : isPedalPressed
                    ? 'bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white scale-95 shadow-[0_0_40px_rgba(225,6,0,0.9)] ring-4 ring-red-500/50'
                    : 'bg-gradient-to-r from-[#E10600] to-red-800 text-white hover:scale-[1.02] shadow-[0_0_25px_rgba(225,6,0,0.5)]'
                }`}
              >
                <Gauge className="w-6 h-6 animate-pulse" />
                <span>{isPedalPressed ? 'REVVING TO THE LIMIT!' : 'HOLD THROTTLE PEDAL'}</span>
              </motion.button>

              <p className="text-[11px] font-mono text-gray-400">
                {isEngineOn ? 'Tip: Hold pedal to experience twin-turbo acoustic shift pops' : 'Turn on ignition first to enable accelerator'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

