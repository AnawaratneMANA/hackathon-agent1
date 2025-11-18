import React, { useState } from 'react';

export default function SupplierRiskCard({ data }) {
  const [expandedSection, setExpandedSection] = useState('overview');

  if (data.error) {
    return (
      <div style={{ color: '#dc3545', padding: '15px', backgroundColor: '#f8d7da', borderRadius: '6px', marginTop: '20px' }}>
        Error: {data.error}
      </div>
    );
  }

  const finalScore = data.final_score || 0;
  const riskColor = finalScore > 70 ? '#dc3545' : finalScore > 40 ? '#ff9800' : '#28a745';
  const riskLabel = finalScore > 70 ? 'HIGH RISK' : finalScore > 40 ? 'MODERATE RISK' : 'LOW RISK';

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: `2px solid ${riskColor}`,
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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

  const scoreContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '20px',
  };

  const scoreBoxStyle = {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '6px',
    borderLeft: `4px solid ${riskColor}`,
  };

  const scoreLabelStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: '8px',
  };

  const scoreValueStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#333',
  };

  const suppliersContainerStyle = {
    marginBottom: '20px',
  };

  const suppliersHeaderStyle = {
    fontSize: '14px',
    fontWeight: '700',
    color: '#333',
    textTransform: 'uppercase',
    marginBottom: '12px',
    paddingBottom: '10px',
    borderBottom: '2px solid #eee',
  };

  const supplierRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    marginBottom: '8px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    border: data.best_supplier === data.risk_scores && Object.keys(data.risk_scores)[0] ? `2px solid #28a745` : '1px solid #ddd',
  };

  const supplierNameStyle = {
    fontWeight: '600',
    fontSize: '15px',
    color: '#333',
  };

  const supplierScoreStyle = {
    fontSize: '14px',
    fontWeight: '700',
    color: '#0056b3',
  };

  const bestSupplierStyle = {
    backgroundColor: '#d4edda',
    border: '2px solid #28a745',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '20px',
  };

  const bestSupplierLabelStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#155724',
    textTransform: 'uppercase',
    marginBottom: '8px',
  };

  const bestSupplierNameStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#155724',
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  const sectionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#f0f7ff',
    border: '1px solid #b3d9ff',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '10px',
  };

  const sectionTitleStyle = {
    fontSize: '14px',
    fontWeight: '700',
    color: '#0056b3',
    textTransform: 'uppercase',
  };

  const sectionContentStyle = {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '6px',
    lineHeight: '1.7',
    color: '#555',
    fontSize: '14px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>🏭 Supplier Risk Assessment</h2>
        <div style={riskBadgeStyle}>{riskLabel} ({finalScore}%)</div>
      </div>

      {/* Key Metrics */}
      <div style={scoreContainerStyle}>
        <div style={scoreBoxStyle}>
          <div style={scoreLabelStyle}>Final Risk Score</div>
          <div style={scoreValueStyle}>{finalScore}</div>
        </div>
        <div style={scoreBoxStyle}>
          <div style={scoreLabelStyle}>Total Suppliers Evaluated</div>
          <div style={scoreValueStyle}>{Object.keys(data.risk_scores || {}).length}</div>
        </div>
        <div style={scoreBoxStyle}>
          <div style={scoreLabelStyle}>Item ID</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#333', wordBreak: 'break-word' }}>
            {data.item_id}
          </div>
        </div>
      </div>

      {/* Best Supplier Recommendation */}
      {data.best_supplier && (
        <div style={bestSupplierStyle}>
          <div style={bestSupplierLabelStyle}>✓ Recommended Supplier</div>
          <div style={bestSupplierNameStyle}>{data.best_supplier}</div>
        </div>
      )}

      {/* Supplier Scores */}
      {data.risk_scores && Object.keys(data.risk_scores).length > 0 && (
        <div style={suppliersContainerStyle}>
          <div style={suppliersHeaderStyle}>Supplier Risk Scores</div>
          {Object.entries(data.risk_scores).map(([supplierId, score]) => (
            <div key={supplierId} style={supplierRowStyle}>
              <div style={supplierNameStyle}>{supplierId}</div>
              <div style={supplierScoreStyle}>{score.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}

      {/* Recommendation Section */}
      {data.recommendation && (
        <div style={sectionStyle}>
          <div
            style={sectionHeaderStyle}
            onClick={() => setExpandedSection(expandedSection === 'recommendation' ? null : 'recommendation')}
          >
            <div style={sectionTitleStyle}>📋 Recommendation & Analysis</div>
            <span style={{ fontSize: '18px', color: '#0056b3' }}>
              {expandedSection === 'recommendation' ? '−' : '+'}
            </span>
          </div>
          {expandedSection === 'recommendation' && (
            <div style={sectionContentStyle}>{data.recommendation}</div>
          )}
        </div>
      )}

      {/* Detailed Analysis Section */}
      {data.detailed_analysis && (
        <div style={sectionStyle}>
          <div
            style={sectionHeaderStyle}
            onClick={() => setExpandedSection(expandedSection === 'analysis' ? null : 'analysis')}
          >
            <div style={sectionTitleStyle}>🔍 Detailed Analysis</div>
            <span style={{ fontSize: '18px', color: '#0056b3' }}>
              {expandedSection === 'analysis' ? '−' : '+'}
            </span>
          </div>
          {expandedSection === 'analysis' && (
            <div style={sectionContentStyle}>{data.detailed_analysis}</div>
          )}
        </div>
      )}
    </div>
  );
}
