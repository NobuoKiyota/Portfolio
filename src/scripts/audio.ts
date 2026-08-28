import { withBase } from '../lib/url';

type TickVariant = 'mouse-over' | 'decide';

interface AmbientNodes {
  oscillators: OscillatorNode[];
  masterGain: GainNode;
}

const SAMPLE_URLS: Record<TickVariant, string> = {
  'mouse-over': withBase('media/mouse-over.wav'),
  decide: withBase('media/decide.wav'),
};

const SAMPLE_GAIN: Record<TickVariant, number> = {
  'mouse-over': 0.35,
  decide: 0.5,
};

class AudioManager {
  private ctx: AudioContext | null = null;
  private ambient: AmbientNodes | null = null;
  private buffers: Partial<Record<TickVariant, AudioBuffer>> = {};
  private loading: Partial<Record<TickVariant, Promise<AudioBuffer>>> = {};

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private loadBuffer(ctx: AudioContext, variant: TickVariant): Promise<AudioBuffer> {
    const cached = this.buffers[variant];
    if (cached) return Promise.resolve(cached);

    const pending = this.loading[variant];
    if (pending) return pending;

    const request = fetch(SAMPLE_URLS[variant])
      .then((res) => res.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .then((buffer) => {
        this.buffers[variant] = buffer;
        return buffer;
      });

    this.loading[variant] = request;
    return request;
  }

  playTick(variant: TickVariant = 'decide'): void {
    const ctx = this.ensureContext();
    this.loadBuffer(ctx, variant)
      .then((buffer) => {
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.value = SAMPLE_GAIN[variant];
        source.connect(gain).connect(ctx.destination);
        source.start();
      })
      .catch(() => {
        // sample failed to load; fail silently rather than break the UI
      });
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
