/* ═══════════════════════════════
   GALLERY + LIGHTBOX
═══════════════════════════════ */
(function () {
  'use strict';

  let lbImages = [];
  let lbIndex  = 0;

  // ─── Sub-gallery navigation ───

  window.openGallery = function (id) {
    document.querySelector('.gallery-grid').style.display = 'none';
    document.getElementById('gallery-' + id).style.display = 'block';
  };

  window.closeGallery = function () {
    document.querySelectorAll('.sub-gallery').forEach(g => g.style.display = 'none');
    document.querySelector('.gallery-grid').style.display = 'grid';
  };

  // ─── Lightbox ───

  window.openLightbox = function (imgEl) {
    const grid = imgEl.closest('.sub-gallery-grid');
    const imgs = Array.from(grid.querySelectorAll('img'));
    lbImages = imgs.map(i => ({ src: i.src, alt: i.alt }));
    lbIndex  = imgs.indexOf(imgEl);
    renderLightbox();
    document.getElementById('lightbox').style.display = 'flex';
    document.addEventListener('keydown', lightboxKeyHandler);
  };

  window.closeLightbox = function () {
    document.getElementById('lightbox').style.display = 'none';
    document.removeEventListener('keydown', lightboxKeyHandler);
  };

  window.lightboxNav = function (dir) {
    lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
    renderLightbox();
  };

  window.lightboxClickOutside = function (e) {
    if (e.target.id === 'lightbox') window.closeLightbox();
  };

  function renderLightbox() {
    const lb  = document.getElementById('lb-img');
    const cap = document.getElementById('lb-caption');
    lb.style.opacity = '0';
    setTimeout(() => {
      lb.src = lbImages[lbIndex].src;
      lb.alt = lbImages[lbIndex].alt;
      cap.textContent = lbImages[lbIndex].alt + '  [ ' + (lbIndex + 1) + ' / ' + lbImages.length + ' ]';
      lb.style.opacity = '1';
    }, 100);
  }

  function lightboxKeyHandler(e) {
    if (e.key === 'ArrowRight') window.lightboxNav(1);
    if (e.key === 'ArrowLeft')  window.lightboxNav(-1);
    if (e.key === 'Escape')     window.closeLightbox();
  }

})();