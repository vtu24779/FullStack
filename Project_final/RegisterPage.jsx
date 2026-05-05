/* ── Admin Dashboard ─────────────────────── */
.adm-page {
  padding-top: 68px;
  padding-bottom: 80px;
  min-height: 100vh;
  background: var(--surface);
}
.adm-page .container { display: flex; flex-direction: column; gap: 28px; }

/* Header */
.adm-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding-top: 40px;
  flex-wrap: wrap;
}

/* Stats */
.adm-stats {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}
.adm-stat-card {
  background: var(--surface-container);
  border: 1px solid var(--outline-var);
  border-radius: var(--radius-xl);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: box-shadow 0.22s, transform 0.22s;
}
.adm-stat-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-3px); }
.adm-stat-icon  { font-size: 1.5rem; }
.adm-stat-value { font-family: var(--font-headline); font-size: 24px; font-weight: 700; line-height: 1; }
.adm-stat-label { font-size: 12px; font-weight: 500; color: var(--on-surface-var); }

/* Top event */
.adm-top-event {
  background: var(--surface-high);
  border: 1px solid var(--outline-var);
  border-radius: var(--radius-lg);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* Charts layout */
.adm-charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.adm-card {
  background: var(--surface-container);
  border: 1px solid var(--outline-var);
  border-radius: var(--radius-xl);
  padding: 24px;
}
.adm-card-wide { grid-column: 1; }
.adm-card-full { grid-column: 1 / -1; }

.adm-card-title {
  font-family: var(--font-headline);
  font-size: 16px;
  font-weight: 600;
  color: var(--on-surface);
  margin-bottom: 20px;
}
.adm-chart-wrap { height: 260px; }

/* List */
.adm-list { display: flex; flex-direction: column; gap: 0; }
.adm-list-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--outline-var);
}
.adm-list-row:last-child { border-bottom: none; }
.adm-rank {
  font-family: var(--font-headline);
  font-size: 14px;
  font-weight: 700;
  color: var(--secondary);
  width: 28px;
  flex-shrink: 0;
}
.adm-list-title { font-size: 14px; font-weight: 600; }

/* Dept Bars */
.adm-dept-bars { display: flex; flex-direction: column; gap: 14px; }
.adm-dept-row { display: flex; align-items: center; gap: 16px; }
.adm-dept-label { font-size: 13px; font-weight: 500; width: 130px; flex-shrink: 0; }
.adm-dept-track {
  flex: 1;
  height: 8px;
  background: var(--surface-highest);
  border-radius: var(--radius-full);
  overflow: hidden;
}
.adm-dept-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.6s ease;
}

@media (max-width: 1200px) { .adm-stats { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 900px)  {
  .adm-stats  { grid-template-columns: repeat(2, 1fr); }
  .adm-charts { grid-template-columns: 1fr; }
  .adm-card-wide, .adm-card-full { grid-column: auto; }
}
@media (max-width: 480px)  { .adm-stats { grid-template-columns: 1fr 1fr; } }
