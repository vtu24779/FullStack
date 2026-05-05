/* ── Booking Page ────────────────────────── */
.bp-page {
  padding-top: 68px;
  padding-bottom: 80px;
  background: var(--surface);
  min-height: 100vh;
}

.bp-header {
  padding: 32px 0 24px;
}
.bp-header .btn { margin-bottom: 16px; }

.bp-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  align-items: flex-start;
}

/* Form Area */
.bp-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.bp-section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.bp-section-icon {
  width: 40px; height: 40px;
  background: var(--surface-highest);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem;
}

.bp-attendees {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.bp-attendee-card {
  background: var(--surface-container);
  border: 1px solid var(--outline-var);
  border-radius: var(--radius-xl);
  padding: 24px;
}
.bp-attendee-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--outline-var);
}
.bp-remove-btn {
  background: none; border: none;
  color: var(--error);
  font-size: 13px; font-weight: 600;
  cursor: pointer;
}
.bp-remove-btn:hover { text-decoration: underline; }

.bp-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* Sidebar / Summary */
.bp-sidebar {
  position: sticky;
  top: 88px;
}
.bp-summary-card {
  padding: 28px;
  background: var(--surface-bright);
}
.bp-event-mini {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px dashed var(--outline-var);
  margin-bottom: 20px;
}
.bp-mini-img {
  width: 56px; height: 56px;
  border-radius: var(--radius-md);
  background: var(--tertiary-container);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; color: var(--primary); font-weight: 700;
}

.bp-summary-rows {
  display: flex; flex-direction: column; gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--outline-var);
  color: var(--on-surface-var);
  font-size: 14px;
}
.bp-summary-row {
  display: flex; justify-content: space-between;
}

.bp-total-row {
  display: flex; justify-content: space-between; align-items: flex-end;
  font-weight: 600; font-size: 18px;
}
.bp-total-price {
  font-family: var(--font-headline);
  font-size: 28px;
  color: var(--primary);
  line-height: 1;
}

/* Responsive */
@media (max-width: 1024px) {
  .bp-layout { grid-template-columns: 1fr; }
  .bp-sidebar { position: static; }
}
@media (max-width: 600px) {
  .bp-form-grid { grid-template-columns: 1fr; }
  .bp-attendee-card { padding: 20px 16px; }
}
