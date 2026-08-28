const root = document.querySelector<HTMLElement>('[data-lightbox-root]');
const img = root?.querySelector<HTMLImageElement>('.lightbox-img');
const closeBtn = root?.querySelector<HTMLButtonElement>('.lightbox-close');

function openLightbox(src: string, alt: string): void {
  if (!root || !img) return;
  img.src = src;
  img.alt = alt;
  root.hidden = false;
  document.body.style.overflow = 'hidden';
  closeBtn?.focus();
}

function closeLightbox(): void {
  if (!root || !img) return;
  root.hidden = true;
  document.body.style.overflow = '';
  img.src = '';
}

if (root && img) {
  document.querySelectorAll<HTMLElement>('[data-lightbox]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-lightbox');
      if (!src) return;
      const alt = trigger.getAttribute('data-lightbox-alt') ?? '';
      openLightbox(src, alt);
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);

  root.addEventListener('click', (event) => {
    if (event.target === root) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !root.hidden) closeLightbox();
  });
}
