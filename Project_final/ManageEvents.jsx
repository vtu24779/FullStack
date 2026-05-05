/* =========================================
   CAMPUS PULSE – Design System
   Epilogue + Be Vietnam Pro
   Palette: Deep Ink / Earth Rust / Almond / Sage
   ========================================= */

@import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700;800&family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* ── CSS Tokens ─────────────────────────── */
:root {
  /* Surface */
  --surface:              #fff9e8;
  --surface-dim:          #e0dac5;
  --surface-bright:       #fff9e8;
  --surface-low:          #faf4de;
  --surface-container:    #f4eed9;
  --surface-high:         #eee8d3;
  --surface-highest:      #e8e2ce;

  /* Text */
  --on-surface:           #1e1c0f;
  --on-surface-var:       #47464d;
  --outline:              #78767d;
  --outline-var:          #c8c5cd;

  /* Primary – Deep Ink */
  --primary:              #0D0C22;
  --on-primary:           #ffffff;
  --primary-container:    #1a1930;
  --on-primary-container: #83819d;

  /* Secondary – Earth Rust */
  --secondary:            #985933;
  --on-secondary:         #ffffff;
  --secondary-container:  #feaf82;
  --on-secondary-container: #78401c;

  /* Tertiary – Sage Leaf */
  --tertiary:             #C8D2BA;
  --on-tertiary:          #ffffff;
  --tertiary-container:   #dce6cd;
  --on-tertiary-container: #7d8772;

  /* Error */
  --error:                #ba1a1a;
  --on-error:             #ffffff;
  --error-container:      #ffdad6;

  /* Inverse */
  --inverse-surface:      #333123;
  --inverse-on-surface:   #f7f1dc;

  /* Typography Scale */
  --font-headline: 'Epilogue', sans-serif;
  --font-body:     'Be Vietnam Pro', sans-serif;

  /* Spacing */
  --spacing-base:     8px;
  --container-max:    1280px;
  --gutter:           24px;
  --margin-desktop:   40px;
  --section-gap:      80px;

  /* Radius */
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:    12px;
  --radius-xl:    16px;
  --radius-2xl:   24px;
  --radius-full:  9999px;

  /* Shadows */
  --shadow-card:    0 2px 12px rgba(13,12,34,0.06);
  --shadow-hover:   0 8px 32px rgba(13,12,34,0.12);
  --shadow-modal:   0 24px 80px rgba(13,12,34,0.18);
}

/* ── Reset & Base ─────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  background-color: var(--surface);
  color: var(--on-surface);
  line-height: 1.6;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

img { display: block; max-width: 100%; }
a  { color: inherit; text-decoration: none; }
button { cursor: pointer; font-family: var(--font-body); }
ul, ol { list-style: none; }

/* ── Typography ────────────────────────── */
.headline-xl {
  font-family: var(--font-headline);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.025em;
}
.headline-lg {
  font-family: var(--font-headline);
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.015em;
}
.headline-md {
  font-family: var(--font-headline);
  font-size: clamp(18px, 2.5vw, 26px);
  font-weight: 600;
  line-height: 1.25;
}
.body-lg  { font-size: 18px; line-height: 1.6; }
.body-md  { font-size: 16px; line-height: 1.6; }
.label-lg { font-size: 14px; font-weight: 600; line-height: 1.2; letter-spacing: 0.04em; }
.label-sm { font-size: 12px; font-weight: 500; line-height: 1.2; letter-spacing: 0.04em; }

/* ── Layout Helpers ─────────────────────── */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--margin-desktop);
}

.flex           { display: flex; }
.flex-col       { flex-direction: column; }
.flex-center    { display: flex; align-items: center; justify-content: center; }
.items-center   { align-items: center; }
.justify-between{ justify-content: space-between; }
.justify-center { justify-content: center; }
.gap-1  { gap: 8px; }
.gap-2  { gap: 16px; }
.gap-3  { gap: 24px; }
.gap-4  { gap: 32px; }

/* ── Buttons ────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-primary {
  background: var(--primary);
  color: var(--on-primary);
  border-color: var(--primary);
}
.btn-primary:hover {
  background: var(--primary-container);
  border-color: var(--primary-container);
  transform: translateY(-1px);
  box-shadow: var(--shadow-hover);
}

.btn-secondary {
  background: var(--secondary);
  color: var(--on-secondary);
  border-color: var(--secondary);
}
.btn-secondary:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  color: var(--secondary);
  border-color: var(--secondary);
}
.btn-outline:hover {
  background: var(--secondary);
  color: var(--on-secondary);
  transform: translateY(-1px);
}

.btn-ghost {
  background: transparent;
  color: var(--on-surface);
  border-color: var(--outline-var);
}
.btn-ghost:hover {
  background: var(--surface-high);
  border-color: var(--outline);
}

.btn-sm { padding: 8px 18px; font-size: 13px; }
.btn-lg { padding: 16px 40px; font-size: 16px; }
.btn-pill { border-radius: var(--radius-full); }

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none !important;
}

/* ── Category Chips ─────────────────────── */
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  background: var(--tertiary-container);
  color: var(--primary);
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.18s ease;
}
.chip:hover, .chip.active {
  background: var(--primary);
  color: var(--on-primary);
}

/* ── Cards ──────────────────────────────── */
.card {
  background: var(--surface-container);
  border: 1px solid var(--outline-var);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: box-shadow 0.22s ease, transform 0.22s ease;
}
.card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-3px);
}

/* Event Card */
.event-card {
  background: var(--surface-container);
  border: 1px solid var(--outline-var);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: box-shadow 0.22s ease, transform 0.22s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.event-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
}

.event-card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: var(--surface-highest);
}
.event-card-img-placeholder {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, var(--tertiary-container), var(--secondary-container));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.event-card-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.event-card-category {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--secondary);
}

.event-card-title {
  font-family: var(--font-headline);
  font-size: 18px;
  font-weight: 600;
  color: var(--on-surface);
  line-height: 1.25;
}

.event-card-meta {
  font-size: 13px;
  color: var(--on-surface-var);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.event-card-footer {
  padding: 14px 20px;
  border-top: 1px solid var(--outline-var);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.event-price {
  font-family: var(--font-headline);
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
}
.event-price.free { color: var(--secondary); }

/* ── Input / Form ───────────────────────── */
.form-group { display: flex; flex-direction: column; gap: 6px; }

.form-label {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--on-surface-var);
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--outline-var);
  border-radius: var(--radius-md);
  background: var(--surface-container-lowest, #ffffff);
  color: var(--on-surface);
  font-family: var(--font-body);
  font-size: 15px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
  outline: none;
}
.form-input::placeholder { color: var(--outline); }
.form-input:focus {
  border-color: var(--secondary);
  box-shadow: 0 0 0 3px rgba(152, 89, 51, 0.12);
}
.form-input:disabled {
  background: var(--surface-high);
  opacity: 0.65;
}

textarea.form-input { resize: vertical; min-height: 100px; }

select.form-input { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2378767d' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 40px; }

/* ── Progress Bar (Capacity) ─────────────── */
.capacity-bar-track {
  height: 6px;
  background: var(--surface-highest);
  border-radius: var(--radius-full);
  overflow: hidden;
}
.capacity-bar-fill {
  height: 100%;
  background: var(--tertiary);
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
}
.capacity-bar-fill.low   { background: var(--error); }
.capacity-bar-fill.mid   { background: var(--secondary); }

/* ── Badge ──────────────────────────────── */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.badge-success { background: var(--tertiary-container); color: var(--primary); }
.badge-warning { background: #fff0c2; color: #7a5200; }
.badge-error   { background: var(--error-container); color: var(--error); }
.badge-info    { background: var(--primary-container); color: #c7c3e2; }

/* ── Page loading spinner ────────────────── */
.spinner-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: var(--surface);
}
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--outline-var);
  border-top-color: var(--secondary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Section Divider ─────────────────────── */
.section-label {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--secondary);
  display: flex;
  align-items: center;
  gap: 12px;
}
.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--outline-var);
}

/* ── Modal / Overlay ─────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(13, 12, 34, 0.55);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadeIn 0.2s ease;
}
.modal-box {
  background: var(--surface-bright);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-modal);
  width: 100%;
  max-width: 580px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.25s ease;
}
.modal-header {
  padding: 28px 32px 20px;
  border-bottom: 1px solid var(--outline-var);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal-body { padding: 28px 32px; }
.modal-footer {
  padding: 20px 32px;
  border-top: 1px solid var(--outline-var);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.modal-close {
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--on-surface-var);
  transition: background 0.18s;
  font-size: 20px;
}
.modal-close:hover { background: var(--surface-high); }

@keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
@keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }

/* ── Toast tweaks ─────────────────────────── */
.Toastify__toast {
  font-family: var(--font-body) !important;
  border-radius: var(--radius-lg) !important;
}

/* ── Responsive ────────────────────────── */
@media (max-width: 768px) {
  .container { padding-inline: 16px; }
  .btn-lg    { padding: 13px 28px; }
}
