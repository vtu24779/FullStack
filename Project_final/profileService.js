/* ── Event Details Page ──────────────────── */
.ed-page {
  padding-top: 68px;
  padding-bottom: 80px;
  background: var(--surface);
  min-height: 100vh;
}

/* Breadcrumb */
.ed-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 24px 0 28px;
  font-size: 13px;
  color: var(--on-surface-var);
}
.ed-breadcrumb a { color: var(--on-surface-var); transition: color 0.18s; }
.ed-breadcrumb a:hover { color: var(--secondary); }
.ed-breadcrumb span:last-child {
  color: var(--on-surface);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 240px;
}

/* Layout */
.ed-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 40px;
  align-items: flex-start;
}

/* Banner */
.ed-banner {
  border-radius: var(--radius-xl);
  overflow: hidden;
  position: relative;
  background: var(--surface-highest);
}
.ed-banner-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}
.ed-banner-placeholder {
  width: 100%;
  height: 340px;
  background: linear-gradient(135deg, var(--tertiary-container), var(--secondary-container));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
}
.ed-category-badge {
  position: absolute;
  top: 20px;
  left: 20px;
}

/* Content */
.ed-content { padding: 32px 0; }
.ed-title { margin-bottom: 24px; }

.ed-meta-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding: 20px;
  background: var(--surface-container);
  border-radius: var(--radius-lg);
  border: 1px solid var(--outline-var);
}
.ed-meta-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.ed-meta-icon { font-size: 1.3rem; margin-top: 2px; }

.ed-description { color: var(--on-surface-var); }

/* Sidebar */
.ed-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 88px;
}

/* Ticket Card */
.ed-ticket-card {
  padding: 28px;
  border: 1px solid var(--outline-var);
  border-radius: var(--radius-xl);
  background: var(--surface-bright);
}
.ed-price-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
}
.ed-price {
  font-family: var(--font-headline);
  font-size: 32px;
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
  margin-top: 4px;
}

/* Info Card */
.ed-info-card {
  padding: 24px;
  border: 1px solid var(--outline-var);
  border-radius: var(--radius-xl);
  background: var(--surface-container);
}
.ed-info-rows { display: flex; flex-direction: column; gap: 0; }
.ed-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--outline-var);
  font-size: 14px;
}
.ed-info-row:last-child { border-bottom: none; }

/* Responsive */
@media (max-width: 1024px) {
  .ed-layout { grid-template-columns: 1fr; }
  .ed-sidebar { position: static; }
}
@media (max-width: 600px) {
  .ed-meta-row { flex-direction: column; gap: 16px; }
  .ed-banner-img { height: 250px; }
}
