import React, { useEffect, useState } from 'react';
import { fetchItems, fetchEOQ, fetchSupplierRiskAssessment } from '../api/Api.js';
import ItemDetailCard from '../components/ItemDetailCard.jsx';
import SupplierRiskCard from '../components/SupplierRiskCard.jsx';

export default function Dashboard({ smeId }) {
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [selected, setSelected] = useState(null);
  const [supplierRisk, setSupplierRisk] = useState(null);
  const [loadingEoq, setLoadingEoq] = useState(false);
  const [loadingRisk, setLoadingRisk] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [eoqCache, setEoqCache] = useState({});

  useEffect(() => {
    setLoadingItems(true);
    fetchItems(smeId).then(data=>setItems(data)).catch(console.error).finally(()=>setLoadingItems(false));
  }, [smeId]);

  async function onSelectItem(item) {
    // Toggle selection
    if (selected?.itemId === item.itemId) {
      setSelected(null);
      setExpandedItems(prev => ({ ...prev, [item.itemId]: false }));
    } else {
      setSelected(item);
      setExpandedItems(prev => ({ ...prev, [item.itemId]: true }));
    }
  }

  async function onGetEOQ() {
    if (!selected) return;
    setLoadingEoq(true);
    try {
      const eoq = await fetchEOQ(smeId, selected.itemId);
      setEoqCache(prev => ({ ...prev, [selected.itemId]: eoq }));
    } catch (e) {
      console.error(e);
      setEoqCache(prev => ({ ...prev, [selected.itemId]: { error: e.message } }));
    } finally { setLoadingEoq(false); }
  }

  async function onGetSupplierRiskAssessment() {
    if (!selected) return;
    setLoadingRisk(true);
    setSupplierRisk(null);
    try {
      const risk = await fetchSupplierRiskAssessment(smeId, selected.itemId);
      setSupplierRisk(risk);
    } catch (e) {
      console.error(e);
      setSupplierRisk({ error: e.message });
    } finally { setLoadingRisk(false); }
  }

  const dashboardStyle = {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    width: '100%',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '30px',
    margin: 0,
    paddingBottom: '15px',
  };

  const tilesContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  };

  const resultContainerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
  };

  return (
    <div style={dashboardStyle}>
      <h1 style={titleStyle}>SuperNorm Procument Advisor Dashboard</h1>
      
      {loadingItems ? (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>
          Loading items...
        </div>
      ) : (
        <>
          <div style={tilesContainerStyle}>
            {items.map(item => (
              <ItemDetailCard
                key={item.itemId}
                item={item}
                eoqData={eoqCache[item.itemId]}
                isSelected={selected?.itemId === item.itemId}
                isExpanded={expandedItems[item.itemId] || false}
                onSelect={() => onSelectItem(item)}
                onGetEOQ={onGetEOQ}
                onGetSupplierRiskAssessment={onGetSupplierRiskAssessment}
                loadingEoq={loadingEoq && selected?.itemId === item.itemId}
                loadingRisk={loadingRisk && selected?.itemId === item.itemId}
              />
            ))}
          </div>
        </>
      )}

      {supplierRisk && (
        <div style={resultContainerStyle}>
          <SupplierRiskCard data={supplierRisk} />
        </div>
      )}
    </div>
  );
}
