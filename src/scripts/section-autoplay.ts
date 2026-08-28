const STEP_MS = 8000;
const RESUME_DELAY_MS = 6000;

function hasPlayingMedia(section: Element | undefined): boolean {
  if (!section) return false;
  const media = section.querySelectorAll<HTMLMediaElement>('video, audio');
  return Array.from(media).some((m) => !m.paused);
}

function setupAutoplay(container: HTMLElement): void {
  const sectionCount = container.children.length;
  if (sectionCount <= 1) return;

  let timer: number | undefined;
  let resumeTimer: number | undefined;

  const stop = () => {
    if (timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };

  const advance = () => {
    const width = container.clientWidth;
    const currentIndex = Math.round(container.scrollLeft / width);
    if (hasPlayingMedia(container.children[currentIndex])) return;

    const nextIndex = (currentIndex + 1) % sectionCount;
    container.scrollTo({ left: nextIndex * width, behavior: 'smooth' });
  };

  const start = () => {
    stop();
    timer = window.setInterval(advance, STEP_MS);
  };

  const pauseThenResume = () => {
    stop();
    if (resumeTimer !== undefined) window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(start, RESUME_DELAY_MS);
  };

  (['wheel', 'pointerdown', 'touchstart', 'keydown'] as const).forEach((eventName) => {
    document.addEventListener(eventName, pauseThenResume, { passive: true });
  });

  start();
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll<HTMLElement>('.snap-container').forEach(setupAutoplay);
}
