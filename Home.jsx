import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout, getUser } from '../services/authService';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const isAdmin = user?.role === 'admin';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userLinks = [
    { to: '/',          label: 'Discover' },
    { to: '/events',    label: 'Events'   },
    { to: '/dashboard', label: 'Dashboard'},
    { to: '/bookings',  label: 'Bookings' },
  ];
  const adminLinks = [
    { to: '/admin',        label: 'Overview'   },
    { to: '/admin/events', label: 'Manage Events' },
  ];
  const navLinks = isAdmin ? adminLinks : userLinks;

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className={`cp-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="cp-nav-inner container">
        {/* Brand */}
        <Link to={isAdmin ? '/admin' : '/'} className="cp-brand" id="nav-brand">
          <span className="cp-brand-dot" />
          <span className="cp-brand-text">Campus Pulse</span>
        </Link>

        {/* Desktop Links */}
        <ul className={`cp-nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`cp-nav-link ${isActive(link.to) ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="cp-nav-actions">
          {user ? (
            <>
              <Link
                to={isAdmin ? '/admin' : '/profile'}
                className="cp-avatar"
                title={user.name}
                id="navbar-avatar-link"
              >
                {user.name?.charAt(0).toUpperCase()}
              </Link>
              <span className="cp-user-name">{user.name?.split(' ')[0]}</span>
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleLogout}
                id="navbar-logout-btn"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className="btn btn-ghost   btn-sm" id="nav-login-btn">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm btn-pill" id="nav-signup-btn">Join →</Link>
            </>
          )}
          <button
            className={`cp-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="hamburger-btn"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
