document.querySelectorAll<HTMLElement>('[data-section-dots]').forEach((nav) => {
  const container = document.querySelector<HTMLElement>('.snap-container');
  if (!container) return;

  const dots = Array.from(nav.querySelectorAll<HTMLAnchorElement>('.section-dot'));
  const sections = dots
    .map((dot) => {
      const id = dot.getAttribute('href')?.slice(1);
      return id ? document.getElementById(id) : null;
    })
    .filter((el): el is HTMLElement => el !== null);

  const setActive = (id: string) => {
    dots.forEach((dot) => {
      dot.dataset.active = String(dot.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActive(entry.target.id);
        }
      });
    },
    { root: container, threshold: [0.5] }
  );

  sections.forEach((section) => observer.observe(section));
});
