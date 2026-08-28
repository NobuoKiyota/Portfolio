let sharedCtx: AudioContext | null = null;

function ensureAudioContext(): AudioContext {
  if (!sharedCtx) {
    sharedCtx = new AudioContext();
  }
  if (sharedCtx.state === 'suspended') {
    void sharedCtx.resume();
  }
  return sharedCtx;
}

function drawKaleidoLayer(
  ctx2d: CanvasRenderingContext2D,
  data: Uint8Array,
  cx: number,
  cy: number,
  baseRadius: number,
  opts: { radiusScale: number; alpha: number; blur: number; lengthScale: number; lineWidth: number }
): void {
  const wedgeBars = Math.ceil(data.length / 4);

  ctx2d.save();
  ctx2d.globalAlpha = opts.alpha;
  ctx2d.shadowColor = 'rgba(201, 168, 106, 0.9)';
  ctx2d.shadowBlur = opts.blur;
  ctx2d.strokeStyle = '#c9a86a';
  ctx2d.lineWidth = opts.lineWidth;
  ctx2d.lineCap = 'round';

  for (let q = 0; q < 4; q += 1) {
    const mirrored = q % 2 === 1;
    for (let i = 0; i < wedgeBars; i += 1) {
      const value = data[i] / 255;
      const t = mirrored ? 1 - i / wedgeBars : i / wedgeBars;
      const angle = t * (Math.PI / 2) + q * (Math.PI / 2);

      const r0 = baseRadius * opts.radiusScale;
      const r1 = r0 + value * baseRadius * opts.lengthScale;

      const x0 = cx + Math.cos(angle) * r0;
      const y0 = cy + Math.sin(angle) * r0;
      const x1 = cx + Math.cos(angle) * r1;
      const y1 = cy + Math.sin(angle) * r1;

      ctx2d.beginPath();
      ctx2d.moveTo(x0, y0);
      ctx2d.lineTo(x1, y1);
      ctx2d.stroke();
    }
  }

  ctx2d.restore();
}

function setupSpectrum(container: HTMLElement): void {
  const audio = container.querySelector('audio');
  const canvas = container.querySelector<HTMLCanvasElement>('.work-spectrum-canvas');
  if (!audio || !canvas) return;

  const ctx2d = canvas.getContext('2d');
  if (!ctx2d) return;

  let analyser: AnalyserNode | null = null;
  let dataArray: Uint8Array | null = null;
  let rafId: number | null = null;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
  };
  resize();
  window.addEventListener('resize', resize);

  const draw = () => {
    if (!analyser || !dataArray) return;
    analyser.getByteFrequencyData(dataArray);

    const w = canvas.width;
    const h = canvas.height;
    ctx2d.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const baseRadius = Math.min(w, h) * 0.16;

    // back layer: larger, softer, glowing -- the "furthest" backdrop
    drawKaleidoLayer(ctx2d, dataArray, cx, cy, baseRadius, {
      radiusScale: 1.7,
      alpha: 0.3,
      blur: Math.min(w, h) * 0.05,
      lengthScale: 1.5,
      lineWidth: Math.max(1, Math.min(w, h) * 0.018),
    });

    // front layer: tighter, sharper
    drawKaleidoLayer(ctx2d, dataArray, cx, cy, baseRadius, {
      radiusScale: 1,
      alpha: 0.9,
      blur: Math.min(w, h) * 0.015,
      lengthScale: 1,
      lineWidth: Math.max(1, Math.min(w, h) * 0.01),
    });

    rafId = requestAnimationFrame(draw);
  };

  const start = () => {
    const ctx = ensureAudioContext();
    if (!analyser) {
      const source = ctx.createMediaElementSource(audio);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.75;
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      source.connect(analyser);
      analyser.connect(ctx.destination);
    }
    if (rafId === null) {
      rafId = requestAnimationFrame(draw);
    }
  };

  const stop = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  audio.addEventListener('play', start);
  audio.addEventListener('pause', stop);
  audio.addEventListener('ended', stop);
}

document.querySelectorAll<HTMLElement>('[data-work-spectrum]').forEach(setupSpectrum);
