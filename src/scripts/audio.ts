type TickVariant = 'hover' | 'click';

interface AmbientNodes {
  oscillators: OscillatorNode[];
  masterGain: GainNode;
}

class AudioManager {
  private ctx: AudioContext | null = null;
  private ambient: AmbientNodes | null = null;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  playTick(variant: TickVariant = 'click'): void {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freq = variant === 'click' ? 880 : 1320;
    const peak = variant === 'click' ? 0.05 : 0.025;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.12);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peak, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  toggleAmbient(on: boolean): void {
    const ctx = this.ensureContext();
    if (on) {
      this.startAmbient(ctx);
    } else {
      this.stopAmbient();
    }
  }

  private startAmbient(ctx: AudioContext): void {
    if (this.ambient) return;
    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.035, now + 2.5);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 700;
    filter.connect(masterGain).connect(ctx.destination);

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.04;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 250;
    lfo.connect(lfoGain).connect(filter.frequency);
    lfo.start(now);

    const baseFreqs = [55, 82.62, 110.5];
    const droneOscillators = baseFreqs.map((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.connect(filter);
      osc.start(now);
      return osc;
    });

    this.ambient = { oscillators: [...droneOscillators, lfo], masterGain };
  }

  private stopAmbient(): void {
    if (!this.ambient || !this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const { oscillators, masterGain } = this.ambient;

    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(0, now + 1.2);

    this.ambient = null;
    window.setTimeout(() => {
      oscillators.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          // already stopped
        }
      });
    }, 1300);
  }
}

export const audioManager = new AudioManager();
