/* ═══════════════════════════════
   CONTACT FORM — Formspree
═══════════════════════════════ */
(function () {
  'use strict';

  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  const FORMSPREE_ID = 'xgolgrgg';

  function setStatus(msg, type) {
    status.textContent = msg;
    status.className = 'form-status ' + type;
  }

  function getFormData() {
    return {
      name:    form.name.value.trim(),
      email:   form.email.value.trim(),
      message: form.message.value.trim(),
    };
  }

  function validate(data) {
    if (!data.name)    return 'IDENTIFIER required.';
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) return 'Valid SIGNAL (email) required.';
    if (!data.message) return 'TRANSMISSION cannot be empty.';
    return null;
  }

  async function submitFormspree(data) {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Transmission failed.');
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const data  = getFormData();
    const error = validate(data);
    if (error) { setStatus('⚠ ' + error, 'error'); return; }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled    = true;
    btn.textContent = 'TRANSMITTING...';
    setStatus('', '');

    try {
      await submitFormspree(data);
      setStatus('✓ TRANSMISSION RECEIVED. I\'ll respond within 48h.', 'success');
      form.reset();
    } catch (err) {
      setStatus('✗ ' + err.message + ' Try again.', 'error');
    } finally {
      btn.disabled    = false;
      btn.textContent = 'TRANSMIT MESSAGE';
    }
  });
})();