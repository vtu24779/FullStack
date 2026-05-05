import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getEvents } from '../services/eventService';
import Navbar from '../components/Navbar';
import './EventsPage.css';

const categoryIcons = {
  Workshop: '🛠️', Seminar: '🗣️', Cultural: '🎭', Technical: '💻',
  Sports: '🏅', Music: '🎵', Other: '📌',
};

const CATEGORIES = ['All', 'Workshop', 'Seminar', 'Cultural', 'Technical'];

const EventsPage = () => {
  const [events, setEvents]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [searchParams]            = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');

  useEffect(() => {
    getEvents()
      .then(res => setEvents(res.data.events || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const c = searchParams.get('category');
    if (c) setActiveCategory(c);
  }, [searchParams]);

  const filtered = events.filter(e => {
    const matchCat  = activeCategory === 'All' || e.category === activeCategory;
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase())
      || e.venue?.toLowerCase().includes(search.toLowerCase())
      || e.category?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const formatPrice = p => parseFloat(p) > 0 ? `₹${parseFloat(p).toFixed(0)}` : 'FREE';
  const formatDate  = d => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  return (
    <>
      <Navbar />
      <div className="ev-page">
        {/* ── Page Header ── */}
        <div className="ev-header">
          <div className="container">
            <div className="section-label">Campus Pulse</div>
            <h1 className="headline-xl" style={{ marginTop: 12 }}>All Events</h1>
            <p className="body-lg ev-header-sub">Discover everything happening on campus</p>

            {/* Search */}
            <div className="ev-search-wrap">
              <span className="ev-search-icon">🔍</span>
              <input
                type="text"
                className="ev-search-input"
                placeholder="Search events, venues, categories…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                id="events-search-input"
              />
              {search && (
                <button className="ev-search-clear" onClick={() => setSearch('')} id="search-clear-btn">✕</button>
              )}
            </div>

            {/* Category Filters */}
            <div className="ev-filters" role="group" aria-label="Event categories">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`chip ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  id={`filter-${cat.toLowerCase()}`}
                >
                  {categoryIcons[cat] && <span>{categoryIcons[cat]}</span>}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="ev-body">
          <div className="container">
            {loading ? (
              <div className="spinner-page" style={{ minHeight: 300 }}>
                <div className="spinner" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="cp-empty">
                <span style={{ fontSize: '3rem' }}>🔍</span>
                <h2 className="headline-md">No events found</h2>
                <p className="body-md" style={{ color: 'var(--on-surface-var)' }}>
                  Try a different search or category.
                </p>
                <button className="btn btn-outline btn-pill" onClick={() => { setSearch(''); setActiveCategory('All'); }}>
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="ev-results-count label-lg" style={{ color: 'var(--on-surface-var)', marginBottom: 24 }}>
                  {filtered.length} event{filtered.length !== 1 ? 's' : ''} found
                </div>
                <div className="ev-grid">
                  {filtered.map(e => (
                    <Link
                      key={e.event_id}
                      to={`/events/${e.event_id}`}
                      className="event-card"
                      id={`event-${e.event_id}`}
                    >
                      {e.poster_url ? (
                        <img src={`http://localhost:5000${e.poster_url}`} alt={e.title} className="event-card-img" />
                      ) : (
                        <div className="event-card-img-placeholder">
                          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', textAlign: 'center', padding: '0 16px', lineHeight: 1.2 }}>{e.title}</span>
                        </div>
                      )}
                      <div className="event-card-body">
                        <span className="event-card-category">{e.category}</span>
                        <h3 className="event-card-title">{e.title}</h3>
                        <div className="event-card-meta">
                          <span>📅 {formatDate(e.date)}</span>
                          <span>📍 {e.venue || 'Campus'}</span>
                          {e.available_seats !== undefined && (
                            <span>🎟️ {e.available_seats} seats left</span>
                          )}
                        </div>
                      </div>
                      <div className="event-card-footer">
                        <span className={`event-price${parseFloat(e.price) <= 0 ? ' free' : ''}`}>
                          {formatPrice(e.price)}
                        </span>
                        <span className="chip">View →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
