import { audioManager } from './audio';

const AMBIENT_STORAGE_KEY = 'portfolio-ambient';

function setupSoundToggle(): void {
  const button = document.getElementById('sound-toggle');
  if (!(button instanceof HTMLButtonElement)) return;

  const wantsAmbient = localStorage.getItem(AMBIENT_STORAGE_KEY) === 'on';
  button.setAttribute('aria-pressed', String(wantsAmbient));

  let resumed = false;
  const resumeIfWanted = () => {
    if (resumed || !wantsAmbient) return;
    resumed = true;
    audioManager.toggleAmbient(true);
  };
  document.addEventListener('pointerdown', resumeIfWanted, { once: true });
  document.addEventListener('keydown', resumeIfWanted, { once: true });

  button.addEventListener('click', () => {
    const next = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(next));
    localStorage.setItem(AMBIENT_STORAGE_KEY, next ? 'on' : 'off');
    resumed = true;
    audioManager.toggleAmbient(next);
    audioManager.playTick('decide');
  });
}

function setupTickSounds(): void {
  document.querySelectorAll<HTMLElement>('[data-sound]').forEach((el) => {
    el.addEventListener('mouseenter', () => audioManager.playTick('mouse-over'));
    el.addEventListener('click', () => audioManager.playTick('decide'));
  });
}

setupSoundToggle();
setupTickSounds();
