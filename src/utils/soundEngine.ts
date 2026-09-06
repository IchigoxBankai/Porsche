class EngineAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private osc3: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isRunning: boolean = false;
  private currentRpm: number = 800; // Idle RPM

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      console.warn('Web Audio API not supported');
    }
  }

  public startEngine(): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isRunning) return true;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 0.5);

    // Filter - Low Pass Engine Rumble
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(4, this.ctx.currentTime);

    // Primary V8 Engine Fundamental Oscillator (Sawtooth)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // 55Hz idle frequency (~800 RPM)

    // Harmonic Twin Oscillator (Square)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'square';
    this.osc2.frequency.setValueAtTime(110, this.ctx.currentTime);

    // High Electric Whine (E-Motor Synth)
    this.osc3 = this.ctx.createOscillator();
    this.osc3.type = 'sine';
    this.osc3.frequency.setValueAtTime(320, this.ctx.currentTime);

    // Deep Sub Bass Rumble
    this.subOsc = this.ctx.createOscillator();
    this.subOsc.type = 'triangle';
    this.subOsc.frequency.setValueAtTime(27.5, this.ctx.currentTime);

    // Connect Audio Graph
    this.osc1.connect(this.filter);
    this.osc2.connect(this.filter);
    this.osc3.connect(this.filter);
    this.subOsc.connect(this.filter);

    this.filter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    // Start Oscillators
    const now = this.ctx.currentTime;
    this.osc1.start(now);
    this.osc2.start(now);
    this.osc3.start(now);
    this.subOsc.start(now);

    this.isRunning = true;
    return true;
  }

  public setRpm(rpm: number) {
    if (!this.isRunning || !this.ctx || !this.osc1 || !this.filter || !this.osc2 || !this.osc3 || !this.subOsc) return;

    this.currentRpm = Math.max(800, Math.min(12000, rpm));
    const now = this.ctx.currentTime;

    // Calculate frequencies based on RPM (800 -> 12000)
    // 800 RPM -> ~50Hz fundamental
    // 12000 RPM -> ~750Hz fundamental
    const baseFreq = 50 + (this.currentRpm - 800) * (700 / 11200);
    
    // Smooth frequency transitions
    this.osc1.frequency.setTargetAtTime(baseFreq, now, 0.05);
    this.osc2.frequency.setTargetAtTime(baseFreq * 1.5, now, 0.05);
    
    // Electric motor whine rises sharply at high revs
    const eWhineFreq = 300 + Math.pow((this.currentRpm - 800) / 11200, 1.5) * 3500;
    this.osc3.frequency.setTargetAtTime(eWhineFreq, now, 0.05);

    this.subOsc.frequency.setTargetAtTime(baseFreq / 2, now, 0.05);

    // Filter opens up during higher RPM
    const cutoffFreq = 400 + Math.pow((this.currentRpm - 800) / 11200, 1.2) * 5000;
    this.filter.frequency.setTargetAtTime(cutoffFreq, now, 0.05);
  }

  public stopEngine() {
    if (!this.isRunning || !this.ctx || !this.masterGain) return;
    
    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    setTimeout(() => {
      this.osc1?.stop();
      this.osc2?.stop();
      this.osc3?.stop();
      this.subOsc?.stop();
      this.isRunning = false;
    }, 600);
  }

  public toggleEngine(): boolean {
    if (this.isRunning) {
      this.stopEngine();
      return false;
    } else {
      return this.startEngine();
    }
  }

  public playGearShiftPop() {
    if (!this.ctx || !this.isRunning) return;

    // Simulate exhaust pop & backfire noise
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1200;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    noise.start();
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }
}

export const soundEngine = new EngineAudioSynthesizer();
