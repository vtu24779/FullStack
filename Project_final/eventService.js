import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEvent } from '../services/eventService';
import { createBooking, joinWaitlist } from '../services/bookingService';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import './BookingPage.css';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Attendee state
  const [attendees, setAttendees] = useState([
    { name: '', email: '', phone: '', usn: '', department: '' }
  ]);

  useEffect(() => {
    getEvent(id)
      .then(res => setEvent(res.data.event))
      .catch(() => toast.error('Event not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <><Navbar /><div className="spinner-page"><div className="spinner" /></div></>;
  if (!event) return <><Navbar /><div className="bp-empty"><h2>Event not found</h2></div></>;

  const isWaitlist = event.status === 'full' || (event.available_tickets ?? 0) <= 0;
  const unitPrice = parseFloat(event.price) || 0;
  const totalPrice = unitPrice * attendees.length;

  const handleAddAttendee = () => {
    if (attendees.length >= 5) return toast.error('Maximum 5 attendees per booking');
    if (!isWaitlist && attendees.length >= event.available_tickets) {
       return toast.error('Cannot select more tickets than available');
    }
    setAttendees([...attendees, { name: '', email: '', phone: '', usn: '', department: '' }]);
  };

  const handleRemoveAttendee = (index) => {
    if (attendees.length > 1) {
      setAttendees(attendees.filter((_, i) => i !== index));
    }
  };

  const handleAttendeeChange = (index, field, value) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    for (let i = 0; i < attendees.length; i++) {
      const a = attendees[i];
      if (!a.name || !a.email || !a.phone) {
        return toast.error(`Please fill all required fields for Attendee ${i+1}`);
      }
    }

    setLoading(true);
    try {
      if (isWaitlist) {
        // Just join waitlist (current logic is 1 per user, so we take primary attendee info implicitly)
        await joinWaitlist(event.event_id);
        toast.success('Successfully joined the waitlist! ⏳');
        navigate('/bookings');
      } else {
        const payload = {
          event_id: event.event_id,
          ticket_count: attendees.length,
          total_price: totalPrice,
          attendee_details: JSON.stringify(attendees)
        };
        await createBooking(payload);
        toast.success(`Successfully booked ${attendees.length} ticket(s)! 🎉`);
        navigate('/bookings');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bp-page">
        <div className="container">
          
          <div className="bp-header">
            <Link to={`/events/${id}`} className="btn btn-ghost btn-sm btn-pill">← Back to Event</Link>
            <h1 className="headline-lg">Complete Your Booking</h1>
          </div>

          <div className="bp-layout">
            
            {/* Left: Form */}
            <div className="bp-main">
              <form onSubmit={handleSubmit} id="booking-form">
                
                <div className="bp-section-title">
                  <span className="bp-section-icon">👥</span>
                  <h2 className="headline-md">Attendee Information</h2>
                </div>

                <div className="bp-attendees">
                  {attendees.map((attendee, index) => (
                    <div key={index} className="bp-attendee-card">
                      <div className="bp-attendee-header">
                        <span className="label-lg" style={{ color: 'var(--primary)' }}>Attendee {index + 1}</span>
                        {index > 0 && (
                          <button type="button" className="bp-remove-btn" onClick={() => handleRemoveAttendee(index)}>
                            Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="bp-form-grid">
                        <div className="form-group">
                          <label className="form-label">Full Name *</label>
                          <input type="text" className="form-input" required placeholder="John Doe"
                                 value={attendee.name} onChange={e => handleAttendeeChange(index, 'name', e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email *</label>
                          <input type="email" className="form-input" required placeholder="john@uni.edu"
                                 value={attendee.email} onChange={e => handleAttendeeChange(index, 'email', e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Phone *</label>
                          <input type="tel" className="form-input" required placeholder="9876543210"
                                 value={attendee.phone} onChange={e => handleAttendeeChange(index, 'phone', e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">USN / ID</label>
                          <input type="text" className="form-input" placeholder="Optional"
                                 value={attendee.usn} onChange={e => handleAttendeeChange(index, 'usn', e.target.value)} />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                          <label className="form-label">Department / College</label>
                          <input type="text" className="form-input" placeholder="e.g. Computer Science"
                                 value={attendee.department} onChange={e => handleAttendeeChange(index, 'department', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {!isWaitlist && attendees.length < 5 && (
                  <button type="button" className="btn btn-outline btn-pill" onClick={handleAddAttendee} style={{ marginTop: 16 }}>
                    + Add Another Attendee
                  </button>
                )}
              </form>
            </div>

            {/* Right: Summary */}
            <div className="bp-sidebar">
              <div className="bp-summary-card card">
                <h3 className="headline-md" style={{ marginBottom: 20 }}>Order Summary</h3>
                
                <div className="bp-event-mini">
                  <div className="bp-mini-img">
                    {event.category.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{event.title}</div>
                    <div className="label-sm" style={{ color: 'var(--on-surface-var)' }}>
                      {new Date(event.event_date).toLocaleDateString()} · {event.venue}
                    </div>
                  </div>
                </div>

                <div className="bp-summary-rows">
                  <div className="bp-summary-row">
                    <span>Tickets ({attendees.length}x)</span>
                    <span>{unitPrice > 0 ? `₹${unitPrice * attendees.length}` : 'FREE'}</span>
                  </div>
                  <div className="bp-summary-row">
                    <span>Processing Fee</span>
                    <span>FREE</span>
                  </div>
                </div>

                <div className="bp-total-row">
                  <span>Total</span>
                  <span className="bp-total-price">{totalPrice > 0 ? `₹${totalPrice}` : 'FREE'}</span>
                </div>

                <button 
                  type="submit" 
                  form="booking-form" 
                  disabled={loading}
                  className={`btn btn-pill ${isWaitlist ? 'btn-outline' : 'btn-primary'}`} 
                  style={{ width: '100%', justifyContent: 'center', marginTop: 24, padding: '16px' }}
                >
                  {loading ? 'Processing…' : isWaitlist ? 'Join Waitlist ⏳' : 'Confirm Booking 🎫'}
                </button>
                
                <p className="label-sm text-center" style={{ color: 'var(--on-surface-var)', marginTop: 16, textAlign: 'center' }}>
                  By clicking confirm, you agree to our Terms & Conditions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
