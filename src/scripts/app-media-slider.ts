function activate(container: HTMLElement, index: string): void {
  const track = container.querySelector<HTMLElement>('.app-media-track');
  if (track) {
    track.style.transform = `translateX(-${Number(index) * 100}%)`;
  }
  container.querySelectorAll<HTMLElement>('.app-media-slide').forEach((slide) => {
    if (slide.dataset.index !== index) {
      slide.querySelector('video')?.pause();
    }
  });
  container.querySelectorAll<HTMLElement>('.app-media-dot').forEach((dot) => {
    const isActive = dot.dataset.index === index;
    dot.dataset.active = String(isActive);
    dot.setAttribute('aria-selected', String(isActive));
  });
}

document.querySelectorAll<HTMLElement>('[data-app-media]').forEach((container) => {
  container.querySelectorAll<HTMLButtonElement>('.app-media-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      if (dot.dataset.index !== undefined) {
        activate(container, dot.dataset.index);
      }
    });
  });
});
