import React, { useState, useEffect } from 'react';
import { createEvent, updateEvent } from '../services/eventService';
import { toast } from 'react-toastify';
import './EventModal.css';

const CATEGORIES = ['Workshop', 'Seminar', 'Cultural', 'Technical'];
const DEPARTMENTS = ['Computer Science', 'Electronics', 'Mechanical', 'Management', 'Arts & Culture', 'Civil', 'Biotechnology'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];
const STATUSES = ['active', 'inactive'];
const TAG_OPTIONS = ['Workshop', 'Seminar', 'Technical', 'Cultural', 'Beginner', 'Advanced', 'Intermediate', 'AI', 'Hackathon', 'Career', 'Art', 'Data Science', 'Fun'];

const defaultForm = {
  title: '', department: '', description: '', venue: '',
  event_date: '', event_time: '', price: 0,
  total_tickets: 100, available_tickets: 100,
  category: 'Workshop', tags: [], status: 'active',
  difficulty_level: 'Beginner', poster: null
};

const EventModal = ({ isOpen, event, onClose, onSuccess }) => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (event) {
        const parsedTags = event.tags ? (typeof event.tags === 'string' ? JSON.parse(event.tags) : event.tags) : [];
        const formattedDate = event.event_date
          ? new Date(event.event_date).toISOString().split('T')[0]
          : '';
        setForm({ ...defaultForm, ...event, event_date: formattedDate, tags: parsedTags, poster: null });
      } else {
        setForm(defaultForm);
      }
      setErrors({});
    }
  }, [isOpen, event]);

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title required';
    if (!form.event_date) e.event_date = 'Date required';
    if (!form.event_time) e.event_time = 'Time required';
    if (!form.total_tickets || form.total_tickets < 1) e.total_tickets = 'Must have at least 1 ticket';
    if (!form.venue.trim()) e.venue = 'Venue required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'poster') { if (v) fd.append('poster', v); }
        else if (k === 'tags') fd.append('tags', JSON.stringify(v));
        else fd.append(k, v);
      });

      if (event) {
        await updateEvent(event.event_id, fd);
        toast.success('Event updated successfully');
      } else {
        await createEvent(fd);
        toast.success('Event created successfully');
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const toggleTag = (tag) => {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag]
    }));
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="headline-md" style={{ margin: 0 }}>
            {event ? '✏️ Edit Event' : '➕ Create New Event'}
          </h2>
          <button className="modal-close" onClick={onClose} id="close-event-modal-btn">✕</button>
        </div>

        <form onSubmit={handleSubmit} id="event-form">
          <div className="modal-body">
            
            <div className="ev-modal-grid-2">
              <div className="form-group">
                <label className="form-label">Event Title *</label>
                <input 
                  type="text" 
                  className={`form-input ${errors.title ? 'error' : ''}`} 
                  value={form.title} 
                  onChange={e => setForm({...form, title: e.target.value})} 
                  placeholder="e.g. Intro to UI/UX" 
                />
                {errors.title && <div className="ev-modal-error">{errors.title}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select 
                  className="form-input" 
                  value={form.department} 
                  onChange={e => setForm({...form, department: e.target.value})}
                >
                  <option value="">Select department</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea 
                className="form-input" 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} 
                placeholder="Event description..." 
              />
            </div>

            <div className="ev-modal-grid-2">
              <div className="form-group">
                <label className="form-label">Venue *</label>
                <input 
                  type="text" 
                  className={`form-input ${errors.venue ? 'error' : ''}`} 
                  value={form.venue} 
                  onChange={e => setForm({...form, venue: e.target.value})} 
                  placeholder="e.g. Main Auditorium" 
                />
                {errors.venue && <div className="ev-modal-error">{errors.venue}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select 
                  className="form-input" 
                  value={form.category} 
                  onChange={e => setForm({...form, category: e.target.value})}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="ev-modal-grid-3">
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input 
                  type="date" 
                  className={`form-input ${errors.event_date ? 'error' : ''}`} 
                  value={form.event_date} 
                  onChange={e => setForm({...form, event_date: e.target.value})} 
                />
                {errors.event_date && <div className="ev-modal-error">{errors.event_date}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Time *</label>
                <input 
                  type="time" 
                  className={`form-input ${errors.event_time ? 'error' : ''}`} 
                  value={form.event_time} 
                  onChange={e => setForm({...form, event_time: e.target.value})} 
                />
                {errors.event_time && <div className="ev-modal-error">{errors.event_time}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={form.price} 
                  min={0} 
                  onChange={e => setForm({...form, price: parseFloat(e.target.value) || 0})} 
                />
              </div>
            </div>

            <div className="ev-modal-grid-3">
              <div className="form-group">
                <label className="form-label">Total Tickets *</label>
                <input 
                  type="number" 
                  className={`form-input ${errors.total_tickets ? 'error' : ''}`} 
                  value={form.total_tickets} 
                  min={1} 
                  onChange={e => setForm({...form, total_tickets: parseInt(e.target.value) || 0})} 
                />
                {errors.total_tickets && <div className="ev-modal-error">{errors.total_tickets}</div>}
              </div>
              {event && (
                <div className="form-group">
                  <label className="form-label">Available</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    value={form.available_tickets} 
                    min={0} 
                    onChange={e => setForm({...form, available_tickets: parseInt(e.target.value) || 0})} 
                  />
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Difficulty</label>
                <select 
                  className="form-input" 
                  value={form.difficulty_level} 
                  onChange={e => setForm({...form, difficulty_level: e.target.value})}
                >
                  {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select 
                  className="form-input" 
                  value={form.status} 
                  onChange={e => setForm({...form, status: e.target.value})}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Event Tags</label>
              <div className="ev-modal-tags">
                {TAG_OPTIONS.map(tag => (
                  <button 
                    key={tag} 
                    type="button"
                    className={`chip ${form.tags.includes(tag) ? 'active' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Event Poster</label>
              <input 
                type="file" 
                className="form-input" 
                accept="image/*" 
                onChange={e => setForm({...form, poster: e.target.files[0]})} 
              />
              {event?.poster_url && !form.poster && (
                <div className="label-sm" style={{ color: 'var(--on-surface-var)', marginTop: 8 }}>
                  Current: <a href={`http://localhost:5000${event.poster_url}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)' }}>View poster</a>
                </div>
              )}
            </div>

          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose} id="cancel-event-modal-btn">Cancel</button>
            <button type="submit" className="btn btn-primary btn-pill" disabled={saving} id="save-event-btn">
              {saving ? '⏳ Saving...' : event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
