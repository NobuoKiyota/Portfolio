function stepSection(container: HTMLElement, direction: number): void {
  const width = container.clientWidth;
  const sectionCount = container.children.length;
  const currentIndex = Math.round(container.scrollLeft / width);
  const target = Math.max(0, Math.min(sectionCount - 1, currentIndex + direction));
  container.scrollTo({ left: target * width, behavior: 'smooth' });
}

document.querySelectorAll<HTMLElement>('[data-section-arrows]').forEach((wrap) => {
  const container = document.querySelector<HTMLElement>('.snap-container');
  const prev = wrap.querySelector<HTMLButtonElement>('.section-arrow-prev');
  const next = wrap.querySelector<HTMLButtonElement>('.section-arrow-next');
  if (!container || !prev || !next) return;

  prev.addEventListener('click', () => stepSection(container, -1));
  next.addEventListener('click', () => stepSection(container, 1));

  const updateDisabled = () => {
    const width = container.clientWidth;
    const index = Math.round(container.scrollLeft / width);
    const count = container.children.length;
    prev.disabled = index <= 0;
    next.disabled = index >= count - 1;
  };

  container.addEventListener('scroll', updateDisabled, { passive: true });
  updateDisabled();
});
