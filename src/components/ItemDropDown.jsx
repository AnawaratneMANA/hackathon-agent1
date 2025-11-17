import React from 'react';

export default function ItemDropdown({ items, loading, onSelect }) {
  if (loading) return <div>Loading items...</div>;
  return (
    <select onChange={e => {
      const code = e.target.value;
      if (!code) return;
      const item = items.find(i => i.itemId === code);
      onSelect(item);
    }}>
      <option value="">-- choose item --</option>
      {items.map(it => <option key={it.itemId} value={it.itemId}>
        {it.itemId} — {it.itemName} (stock: {it.currentStock})
      </option>)}
    </select>
  );
}
