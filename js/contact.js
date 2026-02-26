/* ═══════════════════════════════
   CONTACT FORM
   Works out-of-the-box with:
   - Formspree (default, free)
   - Netlify Forms (add data-netlify="true" to <form>)
   - EmailJS (uncomment section below)
═══════════════════════════════ */
(function () {
  'use strict';

  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  /* ── Option 1: Formspree ──────────────────────────
     1. Create a free account at https://formspree.io
     2. Create a new form and copy your endpoint ID
     3. Replace YOUR_FORM_ID below                    */
  const FORMSPREE_ID = 'YOUR_FORM_ID'; // e.g. 'xpzvgkrb'

  /* ── Option 2: Netlify Forms ──────────────────────
     Add these attributes to your <form> tag in index.html:
       data-netlify="true"
       name="contact"
     Then set USE_NETLIFY = true below.               */
  const USE_NETLIFY = false;

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

  /* ── Formspree submit ─── */
  async function submitFormspree(data) {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Transmission failed.');
  }

  /* ── Netlify submit ─── */
  async function submitNetlify() {
    const body = new FormData(form);
    const res = await fetch('/', { method: 'POST', body });
    if (!res.ok) throw new Error('Transmission failed.');
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data  = getFormData();
    const error = validate(data);

    if (error) { setStatus('⚠ ' + error, 'error'); return; }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled  = true;
    btn.textContent = 'TRANSMITTING...';
    setStatus('', '');

    try {
      if (USE_NETLIFY) {
        await submitNetlify();
      } else if (FORMSPREE_ID !== 'YOUR_FORM_ID') {
        await submitFormspree(data);
      } else {
        // Demo mode — no real submit
        await new Promise(r => setTimeout(r, 800));
      }
      setStatus('✓ TRANSMISSION RECEIVED. I\'ll respond within 48h.', 'success');
      form.reset();
    } catch (err) {
      setStatus('✗ ' + err.message + ' Try again.', 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'TRANSMIT MESSAGE';
    }
  });

})();
