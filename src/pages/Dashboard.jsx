import React, { useEffect, useState } from 'react';
import { fetchItems, fetchInventoryStatus, fetchEOQ, fetchAgentAdvice } from '../api/Api.js';
import ItemDropdown from '../components/ItemDropdown.jsx';
import ItemDetailCard from '../components/ItemDetailCard.jsx';
import AdviceCard from '../components/AdviceCard.jsx';

export default function Dashboard({ smeId }) {
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [selected, setSelected] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [advice, setAdvice] = useState(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [loadingEoq, setLoadingEoq] = useState(false);

  useEffect(() => {
    setLoadingItems(true);
    fetchItems(smeId).then(data=>setItems(data)).catch(console.error).finally(()=>setLoadingItems(false));
  }, [smeId]);

  async function onSelect(item) {
    setSelected(item);
    setInventory(null);
    setAdvice(null);
    try {
      const inv = await fetchInventoryStatus(smeId, item.itemId);
      setInventory(inv);
    } catch (e) {
      console.error(e);
      setInventory({ error: e.message });
    }
  }

  async function onGetEOQ() {
    if (!selected) return;
    setLoadingEoq(true);
    try {
      const eoq = await fetchEOQ(smeId, selected.itemId);
      // attach eoq to inventory view
      setInventory(prev => ({ ...prev, eoq }));
    } catch (e) {
      console.error(e);
      setInventory(prev => ({ ...prev, eoqError: e.message }));
    } finally { setLoadingEoq(false); }
  }

  async function onGetAdvice() {
    if (!selected) return;
    setLoadingAdvice(true);
    setAdvice(null);
    try {
      const ai = await fetchAgentAdvice(smeId, selected.itemId);
      setAdvice(ai);
    } catch (e) {
      console.error(e);
      setAdvice({ error: e.message });
    } finally { setLoadingAdvice(false); }
  }

  return (
    <div style={{padding:20}}>
      <h1>ProcureLens Dashboard</h1>
      <div style={{marginBottom:10}}>
        <label>Select item:</label>
        <ItemDropdown items={items} loading={loadingItems} onSelect={onSelect}/>
      </div>

      {selected && <ItemDetailCard
          item={selected}
          inventory={inventory}
          onGetEOQ={onGetEOQ}
          onGetAdvice={onGetAdvice}
          loadingEoq={loadingEoq}
          loadingAdvice={loadingAdvice}
      />}

      {advice && <AdviceCard data={advice} />}
    </div>
  );
}
