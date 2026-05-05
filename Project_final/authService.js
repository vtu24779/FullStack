import React, { useState, useEffect } from 'react';
import { getMyBookings, cancelBooking } from '../services/bookingService';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './BookingHistory.css';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    getMyBookings()
      .then(res => setBookings(res.data.bookings || []))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false));
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await cancelBooking(id);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (err) {
      toast.error('Failed to cancel booking');
    }
  };

  const filtered = bookings.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return new Date(b.event_date) >= new Date() && b.status === 'confirmed';
    if (filter === 'past') return new Date(b.event_date) < new Date() && b.status === 'confirmed';
    return b.status === filter;
  });

  const formatDate = d => new Date(d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <>
      <Navbar />
      <div className="bh-page">
        <div className="container">
          
          <div className="bh-header">
            <div>
              <div className="section-label">My Account</div>
              <h1 className="headline-lg" style={{ marginTop: 8 }}>My Bookings</h1>
            </div>
            
            <div className="bh-filters">
              {['all', 'upcoming', 'past', 'cancelled', 'waitlisted'].map(f => (
                <button
                  key={f}
                  className={`chip ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="bh-content">
            {loading ? (
              <div className="spinner-page" style={{ minHeight: 300 }}><div className="spinner" /></div>
            ) : filtered.length === 0 ? (
              <div className="cp-empty">
                <span style={{ fontSize: '3rem' }}>🎫</span>
                <h3 className="headline-md">No bookings found</h3>
                <p className="body-md" style={{ color: 'var(--on-surface-var)' }}>You have no {filter !== 'all' ? filter : ''} bookings.</p>
                <Link to="/events" className="btn btn-outline btn-pill mt-4">Browse Events →</Link>
              </div>
            ) : (
              <div className="bh-grid">
                {filtered.map(b => (
                  <div key={b.booking_id} className="bh-card">
                    <div className="bh-card-header">
                      <span className={`badge badge-${b.status === 'confirmed' ? 'success' : b.status === 'cancelled' ? 'error' : 'warning'}`}>
                        {b.status === 'confirmed' ? '✅ Confirmed' : b.status === 'cancelled' ? '❌ Cancelled' : '⏳ Waitlisted'}
                      </span>
                      <span className="label-sm" style={{ color: 'var(--on-surface-var)' }}>
                        Booked: {new Date(b.booking_date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="bh-card-body">
                      <h3 className="headline-md" style={{ marginBottom: 12 }}>{b.title}</h3>
                      <div className="bh-meta-grid">
                        <div className="bh-meta">
                          <span className="bh-icon">📅</span>
                          <div>
                            <div className="label-sm" style={{ color: 'var(--on-surface-var)' }}>Date</div>
                            <div style={{ fontWeight: 500 }}>{formatDate(b.event_date)}</div>
                          </div>
                        </div>
                        <div className="bh-meta">
                          <span className="bh-icon">📍</span>
                          <div>
                            <div className="label-sm" style={{ color: 'var(--on-surface-var)' }}>Venue</div>
                            <div style={{ fontWeight: 500 }}>{b.venue}</div>
                          </div>
                        </div>
                        <div className="bh-meta">
                          <span className="bh-icon">🎟️</span>
                          <div>
                            <div className="label-sm" style={{ color: 'var(--on-surface-var)' }}>Tickets</div>
                            <div style={{ fontWeight: 500 }}>{b.ticket_count}x</div>
                          </div>
                        </div>
                        <div className="bh-meta">
                          <span className="bh-icon">💳</span>
                          <div>
                            <div className="label-sm" style={{ color: 'var(--on-surface-var)' }}>Total Paid</div>
                            <div style={{ fontWeight: 600, color: 'var(--primary)' }}>
                              {parseFloat(b.total_price) > 0 ? `₹${b.total_price}` : 'FREE'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bh-card-footer">
                      <Link to={`/events/${b.event_id}`} className="btn btn-ghost btn-sm">View Event</Link>
                      {b.status !== 'cancelled' && new Date(b.event_date) > new Date() && (
                        <button className="btn btn-outline btn-sm" style={{ color: 'var(--error)', borderColor: 'var(--error)' }} onClick={() => handleCancel(b.booking_id)}>
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHistory;
