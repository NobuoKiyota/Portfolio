function activate(container: Element, index: string): void {
  container.querySelectorAll<HTMLElement>('.app-media-slide').forEach((slide) => {
    const isActive = slide.dataset.index === index;
    slide.dataset.active = String(isActive);
    if (!isActive) {
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
