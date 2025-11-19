import React, { useState } from 'react';

export default function StockRefillAgent({ itemId, supplierId }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);

  const handleRequestRefill = () => {
    setHasRequested(true);
    setShowTooltip(true);
    // Show tooltip for 4 seconds then hide
    setTimeout(() => {
      setShowTooltip(false);
    }, 4000);
  };

  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)',
  };

  const tooltipStyle = {
    position: 'absolute',
    bottom: '110%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#333',
    color: '#ffffff',
    padding: '12px 16px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    zIndex: 1001,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    animation: 'fadeIn 0.3s ease',
  };

  const tooltipArrowStyle = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: '8px solid #333',
  };

  const loadingStyle = {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid #ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <button
        style={buttonStyle}
        onClick={handleRequestRefill}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#218838';
          e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#28a745';
          e.target.style.boxShadow = '0 2px 8px rgba(40, 167, 69, 0.3)';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.98)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        {hasRequested ? (
          <>
            <span style={loadingStyle}></span>
            Processing...
          </>
        ) : (
          <>
            <span>🤖</span>
            Proceed with Order
          </>
        )}
      </button>

      {showTooltip && (
        <div style={tooltipStyle}>
          <div>✓ Your request has been received</div>
          <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.9 }}>
            We are working on refilling your stock
          </div>
          <div style={tooltipArrowStyle}></div>
        </div>
      )}
    </div>
  );
}
