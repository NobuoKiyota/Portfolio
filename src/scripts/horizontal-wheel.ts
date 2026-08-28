const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupHorizontalWheel(container: HTMLElement): void {
  let locked = false;
  const unlock = () => {
    locked = false;
  };

  container.addEventListener(
    'wheel',
    (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      if (locked) return;

      const width = container.clientWidth;
      const sectionCount = container.children.length;
      const currentIndex = Math.round(container.scrollLeft / width);
      const nextIndex = Math.max(
        0,
        Math.min(sectionCount - 1, currentIndex + (event.deltaY > 0 ? 1 : -1))
      );
      if (nextIndex === currentIndex) return;

      locked = true;
      container.scrollTo({ left: nextIndex * width, behavior: 'smooth' });
      container.addEventListener('scrollend', unlock, { once: true });
      setTimeout(unlock, 700);
    },
    { passive: false }
  );
}

if (!prefersReducedMotion) {
  document.querySelectorAll<HTMLElement>('.snap-container').forEach(setupHorizontalWheel);
}
