import React, { useState } from 'react';
import { formatAnalysisText, renderFormattedContent } from '../utils/textFormatter.jsx';

export default function SupplierRiskModal({ data, isOpen, onClose }) {
  const [expandedSection, setExpandedSection] = useState('overview');

  if (!isOpen || !data) return null;

  if (data.error) {
    return (
      <div style={overlayStyle}>
        <div style={{ ...modalStyle, maxWidth: '500px' }}>
          <div style={{ color: '#dc3545', padding: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Error</div>
            <div>{data.error}</div>
          </div>
          <button
            onClick={onClose}
            style={{ ...closeButtonStyle, width: '100%', marginTop: '20px' }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const finalScore = data.final_score || 0;
  const riskColor = finalScore > 70 ? '#dc3545' : finalScore > 40 ? '#ff9800' : '#28a745';
  const riskLabel = finalScore > 70 ? 'HIGH RISK' : finalScore > 40 ? 'MODERATE RISK' : 'LOW RISK';

  const recommendationElements = formatAnalysisText(data.recommendation);
  const analysisElements = formatAnalysisText(data.detailed_analysis);

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={{ ...modalHeaderStyle, borderBottomColor: riskColor }}>
          <h2 style={{ ...modalTitleStyle }}>🏭 Supplier Risk Assessment</h2>
          <button
            onClick={onClose}
            style={closeButtonStyle}
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={modalContentStyle}>
          {/* Risk Badge */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', justifyContent: 'center' }}>
            <div style={{ ...riskBadgeContainerStyle, borderColor: riskColor, backgroundColor: `${riskColor}15` }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>
                Risk Level
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: riskColor }}>
                {riskLabel}
              </div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: riskColor, marginTop: '5px' }}>
                {finalScore}%
              </div>
            </div>

            <div style={{ ...infoGridStyle }}>
              <div style={infoBoxStyle}>
                <div style={infoLabelStyle}>Total Suppliers</div>
                <div style={infoValueStyle}>{Object.keys(data.risk_scores || {}).length}</div>
              </div>
              <div style={infoBoxStyle}>
                <div style={infoLabelStyle}>Item ID</div>
                <div style={infoValueStyle}>{data.item_id}</div>
              </div>
            </div>
          </div>

          {/* Best Supplier */}
          {data.best_supplier && (
            <div style={{ ...bestSupplierBoxStyle, borderColor: '#28a745', backgroundColor: '#d4edda' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#155724', textTransform: 'uppercase', marginBottom: '8px' }}>
                ✓ Recommended Supplier
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#155724' }}>
                {data.best_supplier}
              </div>
            </div>
          )}

          {/* Supplier Scores */}
          {data.risk_scores && Object.keys(data.risk_scores).length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <div style={sectionTitleStyle}>Supplier Risk Scores</div>
              <div style={supplierScoresContainerStyle}>
                {Object.entries(data.risk_scores)
                  .sort(([, a], [, b]) => a - b)
                  .map(([supplierId, score]) => (
                    <div
                      key={supplierId}
                      style={{
                        ...supplierScoreRowStyle,
                        borderLeftColor: score < 7 ? '#28a745' : score < 9 ? '#ff9800' : '#dc3545',
                      }}
                    >
                      <div style={{ fontWeight: '600', fontSize: '15px', color: '#333' }}>
                        {supplierId}
                      </div>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: '700',
                          color: score < 7 ? '#28a745' : score < 9 ? '#ff9800' : '#dc3545',
                        }}
                      >
                        {score.toFixed(2)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Recommendation Section */}
          {data.recommendation && (
            <div style={{ marginBottom: '20px' }}>
              <div
                style={expandableSectionStyle}
                onClick={() => setExpandedSection(expandedSection === 'recommendation' ? null : 'recommendation')}
              >
                <div style={sectionTitleStyle}>📋 Recommendation & Analysis</div>
                <span style={{ fontSize: '18px', color: '#0056b3', fontWeight: 'bold' }}>
                  {expandedSection === 'recommendation' ? '−' : '+'}
                </span>
              </div>
              {expandedSection === 'recommendation' && recommendationElements && (
                <div style={sectionContentStyle}>
                  {renderFormattedContent(recommendationElements)}
                </div>
              )}
            </div>
          )}

          {/* Detailed Analysis Section */}
          {data.detailed_analysis && (
            <div style={{ marginBottom: '20px' }}>
              <div
                style={expandableSectionStyle}
                onClick={() => setExpandedSection(expandedSection === 'analysis' ? null : 'analysis')}
              >
                <div style={sectionTitleStyle}>🔍 Detailed Analysis</div>
                <span style={{ fontSize: '18px', color: '#0056b3', fontWeight: 'bold' }}>
                  {expandedSection === 'analysis' ? '−' : '+'}
                </span>
              </div>
              {expandedSection === 'analysis' && analysisElements && (
                <div style={sectionContentStyle}>
                  {renderFormattedContent(analysisElements)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={modalFooterStyle}>
          <button
            onClick={onClose}
            style={{ ...closeButtonFinalStyle }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Close Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2000,
  padding: '20px',
};

const modalStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
  maxWidth: '900px',
  width: '100%',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '25px',
  borderBottom: '3px solid #007bff',
  backgroundColor: '#f8f9fa',
};

const modalTitleStyle = {
  fontSize: '26px',
  fontWeight: '700',
  color: '#333',
  margin: 0,
};

const closeButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '28px',
  color: '#999',
  cursor: 'pointer',
  padding: '0',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'color 0.2s',
};

const modalContentStyle = {
  padding: '30px',
  overflowY: 'auto',
  flex: 1,
};

const riskBadgeContainerStyle = {
  flex: 1,
  padding: '20px',
  borderRadius: '8px',
  border: '2px solid',
  textAlign: 'center',
  minWidth: '180px',
};

const infoGridStyle = {
  flex: 1,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
};

const infoBoxStyle = {
  backgroundColor: '#f8f9fa',
  padding: '15px',
  borderRadius: '8px',
  textAlign: 'center',
};

const infoLabelStyle = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#999',
  textTransform: 'uppercase',
  marginBottom: '8px',
};

const infoValueStyle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#333',
};

const bestSupplierBoxStyle = {
  padding: '20px',
  borderRadius: '8px',
  border: '2px solid',
  marginBottom: '25px',
  textAlign: 'center',
};

const sectionTitleStyle = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#333',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const supplierScoresContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '12px',
  marginTop: '12px',
};

const supplierScoreRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px',
  backgroundColor: '#f8f9fa',
  borderRadius: '6px',
  borderLeft: '4px solid',
};

const expandableSectionStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  backgroundColor: '#f0f7ff',
  border: '1px solid #b3d9ff',
  borderRadius: '6px',
  cursor: 'pointer',
  marginBottom: '10px',
  transition: 'background-color 0.2s',
};

const sectionContentStyle = {
  backgroundColor: '#f8f9fa',
  padding: '20px',
  borderRadius: '6px',
  marginBottom: '15px',
  border: '1px solid #eee',
};

const modalFooterStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '20px 30px',
  borderTop: '1px solid #eee',
  backgroundColor: '#f8f9fa',
  gap: '12px',
};

const closeButtonFinalStyle = {
  backgroundColor: '#007bff',
  color: '#ffffff',
  border: 'none',
  padding: '12px 30px',
  borderRadius: '6px',
  fontSize: '15px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};
