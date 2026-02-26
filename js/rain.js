/* ═══════════════════════════════
   RAIN EFFECT
═══════════════════════════════ */
(function () {
  'use strict';

  const container = document.getElementById('rain');
  if (!container) return;

  // Respect reduced-motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const DROP_COUNT = window.innerWidth < 600 ? 30 : 60;

  for (let i = 0; i < DROP_COUNT; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.cssText = [
      `left: ${Math.random() * 100}vw`,
      `height: ${50 + Math.random() * 80}px`,
      `animation-duration: ${3 + Math.random() * 5}s`,
      `animation-delay: ${-Math.random() * 8}s`,
      `opacity: ${(0.1 + Math.random() * 0.2).toFixed(2)}`,
    ].join(';');
    container.appendChild(drop);
  }
})();
