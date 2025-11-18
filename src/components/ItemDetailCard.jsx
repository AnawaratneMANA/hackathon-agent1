import React from 'react';

export default function ItemDetailCard({
  item,
  eoqData,
  isSelected,
  isExpanded,
  onSelect,
  onGetEOQ,
  onGetSupplierRiskAssessment,
  loadingEoq,
  loadingRisk,
}) {
  // Determine if stock is running low (close to safety stock)
  const isLowStock = item.currentStock <= item.safetyStocks * 1.5;
  const isCritical = item.currentStock <= item.safetyStocks;

  const tileStyle = {
    backgroundColor: isCritical ? '#fff5f5' : isLowStock ? '#fffbf0' : '#ffffff',
    border: isSelected
      ? '2px solid #007bff'
      : isCritical ? '2px solid #dc3545' : isLowStock ? '2px solid #ff9800' : '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isSelected ? '0 6px 16px rgba(0, 123, 255, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
    gap: '10px',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#333',
    margin: 0,
    flex: 1,
  };

  const badgeStyle = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: isCritical ? '#dc3545' : isLowStock ? '#ff9800' : '#28a745',
    color: '#ffffff',
    whiteSpace: 'nowrap',
  };

  const stockInfoStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '15px',
  };

  const infoItemStyle = {
    backgroundColor: '#f8f9fa',
    padding: '12px',
    borderRadius: '6px',
  };

  const labelStyle = {
    fontSize: '11px',
    color: '#999',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: '6px',
    letterSpacing: '0.5px',
  };

  const valueStyle = {
    fontSize: '16px',
    fontWeight: '700',
    color: '#333',
  };

  const buttonContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginTop: '15px',
  };

  const buttonStyle = {
    padding: '10px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.1s',
  };

  const detailedInfoStyle = {
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
    maxHeight: isExpanded ? '1000px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, opacity 0.3s ease',
    opacity: isExpanded ? 1 : 0,
  };

  const detailRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    fontSize: '14px',
    color: '#555',
    borderBottom: '1px solid #f0f0f0',
  };

  const detailLabelStyle = {
    fontWeight: '600',
    color: '#666',
  };

  const eoqDisplayStyle = {
    backgroundColor: '#e7f3ff',
    border: '1px solid #b3d9ff',
    borderRadius: '6px',
    padding: '12px',
    marginTop: '10px',
    marginBottom: '10px',
  };

  const eoqTitleStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#0056b3',
    marginBottom: '6px',
    textTransform: 'uppercase',
  };

  const eoqValueStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#0056b3',
  };

  return (
    <div style={tileStyle} onClick={onSelect}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>{item.itemName}</h3>
        <span style={badgeStyle}>
          {isCritical ? '🔴 CRITICAL' : isLowStock ? '⚠️ LOW STOCK' : '✓ NORMAL'}
        </span>
      </div>

      <div style={stockInfoStyle}>
        <div style={infoItemStyle}>
          <div style={labelStyle}>Current Stock</div>
          <div style={valueStyle}>{item.currentStock}</div>
        </div>
        <div style={infoItemStyle}>
          <div style={labelStyle}>Safety Stock</div>
          <div style={valueStyle}>{item.safetyStocks}</div>
        </div>
        <div style={infoItemStyle}>
          <div style={labelStyle}>Daily Consumption</div>
          <div style={valueStyle}>{item.dailyConsumption.toFixed(2)}</div>
        </div>
        <div style={infoItemStyle}>
          <div style={labelStyle}>Days of Cover</div>
          <div style={valueStyle}>{item.daysOfCover.toFixed(1)}</div>
        </div>
      </div>

      {isExpanded && (
        <div style={detailedInfoStyle}>
          <div style={detailRowStyle}>
            <span style={detailLabelStyle}>Item ID:</span>
            <span>{item.itemId}</span>
          </div>
          <div style={detailRowStyle}>
            <span style={detailLabelStyle}>Lead Time (days):</span>
            <span>{item.leadTimeDays}</span>
          </div>
          <div style={detailRowStyle}>
            <span style={detailLabelStyle}>Vendor Type:</span>
            <span>{item.vendorType}</span>
          </div>

          {eoqData && (
            <div style={eoqDisplayStyle}>
              <div style={eoqTitleStyle}>Economic Order Quantity (EOQ)</div>
              {eoqData.error ? (
                <div style={{ color: '#dc3545', fontSize: '14px' }}>Error: {eoqData.error}</div>
              ) : (
                <div style={eoqValueStyle}>{eoqData.eoq} units</div>
              )}
            </div>
          )}
        </div>
      )}

      {isSelected && isExpanded && (
        <div style={buttonContainerStyle}>
          <button
            style={buttonStyle}
            onClick={(e) => {
              e.stopPropagation();
              onGetEOQ();
            }}
            disabled={loadingEoq}
            onMouseEnter={(e) => !loadingEoq && (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            {loadingEoq ? '⏳ Calculating...' : '📊 Generate EOQ'}
          </button>
          <button
            style={buttonStyle}
            onClick={(e) => {
              e.stopPropagation();
              onGetSupplierRiskAssessment();
            }}
            disabled={loadingRisk}
            onMouseEnter={(e) => !loadingRisk && (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            {loadingRisk ? '⏳ Assessing...' : '🏭 Supplier Risk'}
          </button>
        </div>
      )}
    </div>
  );
}
