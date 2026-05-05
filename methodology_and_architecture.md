import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEvent } from '../services/eventService';
import { getUser } from '../services/authService';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import './EventDetailsPage.css';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUser();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvent(id)
      .then(res => setEvent(res.data.event))
      .catch(() => toast.error('Event not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="spinner-page"><div className="spinner" /></div>
      </>
    );
  }
  if (!event) {
    return (
      <>
        <Navbar />
        <div className="flex-center" style={{ height: '60vh', flexDirection: 'column', gap: 16 }}>
          <h2 className="headline-md">Event not found</h2>
          <Link to="/events" className="btn btn-primary btn-pill">← Browse Events</Link>
        </div>
      </>
    );
  }

  const isWaitlist = event.status === 'full' || (event.available_tickets ?? 0) <= 0;
  const capacity   = event.total_tickets > 0 ? (event.available_tickets / event.total_tickets) * 100 : 0;
  const tags = event.tags
    ? (typeof event.tags === 'string' ? JSON.parse(event.tags) : event.tags)
    : [];
  const formatDate = d => d ? new Date(d).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '—';

  const barClass = capacity > 50 ? '' : capacity > 20 ? 'mid' : 'low';

  return (
    <>
      <Navbar />
      <div className="ed-page">
        <div className="container">

          {/* Breadcrumb */}
          <nav className="ed-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/events">Events</Link>
            <span>/</span>
            <span>{event.title}</span>
          </nav>

          <div className="ed-layout">
            {/* ── Left: Main Content ── */}
            <div className="ed-main">
              {/* Poster / Banner */}
              <div className="ed-banner">
                {event.poster_url ? (
                  <img src={`http://localhost:5000${event.poster_url}`} alt={event.title} className="ed-banner-img" />
                ) : (
                  <div className="ed-banner-placeholder">
                    <span style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary)', textAlign: 'center', padding: '0 40px', lineHeight: 1.2 }}>{event.title}</span>
                  </div>
                )}
                <span className="ed-category-badge chip">{event.category}</span>
              </div>

              {/* Title & Meta */}
              <div className="ed-content">
                <div className="section-label" style={{ marginBottom: 12 }}>
                  {event.department || 'Campus Event'}
                </div>
                <h1 className="headline-xl ed-title">{event.title}</h1>

                <div className="ed-meta-row">
                  <div className="ed-meta-item">
                    <span className="ed-meta-icon">📅</span>
                    <div>
                      <div className="label-sm" style={{ color: 'var(--on-surface-var)' }}>Date</div>
                      <div className="label-lg">{formatDate(event.event_date || event.date)}</div>
                    </div>
                  </div>
                  <div className="ed-meta-item">
                    <span className="ed-meta-icon">🕐</span>
                    <div>
                      <div className="label-sm" style={{ color: 'var(--on-surface-var)' }}>Time</div>
                      <div className="label-lg">{event.event_time || event.time || '—'}</div>
                    </div>
                  </div>
                  <div className="ed-meta-item">
                    <span className="ed-meta-icon">📍</span>
                    <div>
                      <div className="label-sm" style={{ color: 'var(--on-surface-var)' }}>Venue</div>
                      <div className="label-lg">{event.venue || 'Campus'}</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="section-label" style={{ margin: '32px 0 16px' }}>About this event</div>
                <p className="body-lg ed-description">
                  {event.description || 'No description provided for this event.'}
                </p>

                {/* Tags */}
                {tags.length > 0 && (
                  <div style={{ marginTop: 24 }}>
                    <div className="section-label" style={{ marginBottom: 12 }}>Tags</div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {tags.map(t => <span key={t} className="chip">{t}</span>)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Sidebar ── */}
            <aside className="ed-sidebar">
              {/* Ticket Card */}
              <div className="ed-ticket-card card">
                <div className="ed-price-row">
                  <div>
                    <div className="label-sm" style={{ color: 'var(--on-surface-var)' }}>Ticket Price</div>
                    <div className="ed-price">
                      {parseFloat(event.price) > 0 ? `₹${event.price}` : 'FREE'}
                    </div>
                  </div>
                  <span className={`badge ${isWaitlist ? 'badge-error' : 'badge-success'}`}>
                    {isWaitlist ? 'Waitlist' : 'Available'}
                  </span>
                </div>

                {/* Capacity Bar */}
                <div style={{ margin: '20px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className="label-sm" style={{ color: 'var(--on-surface-var)' }}>Availability</span>
                    <span className="label-sm" style={{ fontWeight: 600 }}>
                      {event.available_tickets} / {event.total_tickets} seats
                    </span>
                  </div>
                  <div className="capacity-bar-track">
                    <div
                      className={`capacity-bar-fill ${barClass}`}
                      style={{ width: `${capacity}%` }}
                    />
                  </div>
                </div>

                {user ? (
                  <Link
                    to={`/book/${event.event_id}`}
                    className={`btn btn-pill ${isWaitlist ? 'btn-outline' : 'btn-primary'}`}
                    style={{ width: '100%', justifyContent: 'center' }}
                    id={`book-btn-${event.event_id}`}
                  >
                    {isWaitlist ? '⏳ Join Waitlist' : '🎫 Get Tickets'}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-primary btn-pill"
                    style={{ width: '100%', justifyContent: 'center' }}
                    id="login-to-book-btn"
                  >
                    Login to Book
                  </Link>
                )}
              </div>

              {/* Organizer / Info Card */}
              <div className="ed-info-card card">
                <div className="label-lg" style={{ marginBottom: 16 }}>Event Details</div>
                <div className="ed-info-rows">
                  {[
                    { icon: '🏫', label: 'Department', value: event.department || '—' },
                    { icon: '📋', label: 'Category',   value: event.category   || '—' },
                    { icon: '🎟️', label: 'Total Seats', value: event.total_tickets },
                    { icon: '✅', label: 'Available',   value: event.available_tickets },
                  ].map(row => (
                    <div key={row.label} className="ed-info-row">
                      <span>{row.icon} {row.label}</span>
                      <span style={{ fontWeight: 600 }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="btn btn-ghost btn-pill"
                style={{ width: '100%', justifyContent: 'center' }}
                id="back-to-events-btn"
              >
                ← Back
              </button>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailsPage;
