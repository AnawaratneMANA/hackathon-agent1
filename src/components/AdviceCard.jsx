import React from 'react';

export default function AdviceCard({ data }) {
  if (data.error) return <div style={{color:'red'}}>AI Error: {data.error}</div>;

  const riskLevel = data.risk_score || 0;
  const riskColor = riskLevel > 70 ? '#dc3545' : riskLevel > 40 ? '#ff9800' : '#28a745';
  const riskLabel = riskLevel > 70 ? 'HIGH' : riskLevel > 40 ? 'MEDIUM' : 'LOW';

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: `2px solid ${riskColor}`,
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: `2px solid ${riskColor}`,
    paddingBottom: '15px',
  };

  const titleStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#333',
    margin: 0,
  };

  const riskBadgeStyle = {
    backgroundColor: riskColor,
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '700',
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  const sectionTitleStyle = {
    fontSize: '14px',
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: '10px',
  };

  const eoqStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#007bff',
    backgroundColor: '#f0f7ff',
    padding: '12px',
    borderRadius: '6px',
    display: 'inline-block',
  };

  const narrativeStyle = {
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.6',
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '6px',
    borderLeft: `4px solid ${riskColor}`,
  };

  const actionItemStyle = {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '10px',
    borderLeft: `4px solid #007bff`,
  };

  const actionLabelStyle = {
    fontSize: '13px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '5px',
  };

  const actionDetailStyle = {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.5',
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>🤖 Procurement Intelligence</h2>
        <div style={riskBadgeStyle}>Risk: {riskLabel} ({riskLevel}%)</div>
      </div>

      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Recommended EOQ (Economic Order Quantity)</div>
        <div style={eoqStyle}>{data.eoq} units</div>
      </div>

      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Analysis & Narrative</div>
        <div style={narrativeStyle}>{data.narrative}</div>
      </div>

      {data.actions && data.actions.length > 0 && (
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Recommended Actions</div>
          {data.actions.map((action, i) => (
            <div key={i} style={actionItemStyle}>
              <div style={actionLabelStyle}>
                📋 {action.action}
              </div>
              <div style={actionDetailStyle}>
                <div><strong>Quantity:</strong> {action.qty} units</div>
                <div><strong>Supplier Type:</strong> {action.supplier_type}</div>
                <div><strong>Reason:</strong> {action.reason}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
