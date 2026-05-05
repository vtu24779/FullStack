/* ── Booking History Page ────────────────── */
.bh-page {
  padding-top: 68px;
  padding-bottom: 80px;
  min-height: 100vh;
  background: var(--surface);
}

.bh-header {
  padding: 40px 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid var(--outline-var);
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.bh-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.bh-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.bh-card {
  background: var(--surface-container);
  border: 1px solid var(--outline-var);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
}

.bh-card-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--outline-var);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bh-card-body {
  padding: 24px;
  flex: 1;
}

.bh-meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 16px;
  padding: 16px;
  background: var(--surface-bright);
  border-radius: var(--radius-md);
  border: 1px solid var(--outline-var);
}

.bh-meta {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
}
.bh-icon {
  font-size: 1.2rem;
  margin-top: 2px;
}

.bh-card-footer {
  padding: 16px 24px;
  border-top: 1px dashed var(--outline-var);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Responsive */
@media (max-width: 900px) {
  .bh-grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .bh-meta-grid { grid-template-columns: 1fr; gap: 16px; }
}
