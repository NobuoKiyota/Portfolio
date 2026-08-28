const AUTO_ADVANCE_MS = 4000;
const RESUME_DELAY_MS = 5000;

function activate(container: HTMLElement, index: number): void {
  const track = container.querySelector<HTMLElement>('.app-media-track');
  if (track) {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  container.querySelectorAll<HTMLElement>('.app-media-slide').forEach((slide) => {
    if (Number(slide.dataset.index) !== index) {
      slide.querySelector('video')?.pause();
    }
  });
  container.querySelectorAll<HTMLElement>('.app-media-dot').forEach((dot) => {
    const isActive = Number(dot.dataset.index) === index;
    dot.dataset.active = String(isActive);
    dot.setAttribute('aria-selected', String(isActive));
  });
}

function setupMediaReel(container: HTMLElement): void {
  const dots = Array.from(container.querySelectorAll<HTMLButtonElement>('.app-media-dot'));
  const slideCount = container.querySelectorAll('.app-media-slide').length;
  if (slideCount <= 1) return;

  let currentIndex = 0;
  let autoTimer: number | undefined;
  let resumeTimer: number | undefined;

  const stopAuto = () => {
    if (autoTimer !== undefined) {
      window.clearInterval(autoTimer);
      autoTimer = undefined;
    }
  };

  const startAuto = () => {
    stopAuto();
    autoTimer = window.setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      activate(container, currentIndex);
    }, AUTO_ADVANCE_MS);
  };

  const focusThenResume = (index: number) => {
    currentIndex = index;
    activate(container, currentIndex);
    stopAuto();
    if (resumeTimer !== undefined) window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(startAuto, RESUME_DELAY_MS);
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index);
      if (Number.isNaN(index)) return;
      focusThenResume(index);
    });
  });

  container.querySelectorAll<HTMLVideoElement>('video').forEach((video) => {
    video.addEventListener('play', stopAuto);
    video.addEventListener('pause', startAuto);
    video.addEventListener('ended', startAuto);
  });

  startAuto();
}

document.querySelectorAll<HTMLElement>('[data-app-media]').forEach(setupMediaReel);
