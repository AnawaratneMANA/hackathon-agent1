import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('smeId');
    // Navigate to login
    navigate('/login');
  };

  const navbarStyle = {
    backgroundColor: '#007bff',
    padding: '15px 25px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#ffffff',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const rightSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
  };

  const smeInfoStyle = {
    color: '#e7f3ff',
    fontSize: '14px',
    fontWeight: '500',
  };

  const logoutButtonStyle = {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.1s',
  };

  return (
    <nav style={navbarStyle}>
      <h1 style={logoStyle}>
        <span>📊</span>
        SuperNorm 
      </h1>
      <div style={rightSectionStyle}>
        <div style={smeInfoStyle}>
          Welcome, <strong>SME_001</strong>
        </div>
        <button
          style={logoutButtonStyle}
          onClick={handleLogout}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#c82333')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc3545')}
          onMouseDown={(e) => (e.target.style.transform = 'scale(0.98)')}
          onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}
