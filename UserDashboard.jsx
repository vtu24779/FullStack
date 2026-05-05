/* ── Auth Page ─────────────────────────── */
.auth-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 68px;
}

/* Illustration Side */
.auth-illustration {
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}
.auth-illustration::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -80px;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: rgba(255,255,255,0.04);
}
.auth-illustration::after {
  content: '';
  position: absolute;
  bottom: -80px;
  left: -80px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: rgba(152,89,51,0.15);
}

.auth-ill-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}
.auth-ill-icon {
  font-size: 5rem;
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}
.auth-ill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 20px;
}

/* Form Side */
.auth-form-side {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 48px;
  background: var(--surface);
}
.auth-form-box {
  width: 100%;
  max-width: 420px;
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 900px) {
  .auth-page              { grid-template-columns: 1fr; }
  .auth-illustration      { display: none; }
  .auth-form-side         { padding: 48px 24px; }
}
