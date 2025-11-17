import React from 'react';

export default function ItemDetailCard({ item, inventory, onGetEOQ, onGetAdvice, loadingEoq, loadingAdvice }) {
  return (
    <div style={{border:'1px solid #ddd', padding:12, marginTop:10}}>
      <h3>{item.itemName} ({item.itemId})</h3>
      {inventory ? (
        inventory.error ? <div style={{color:'red'}}>Error: {inventory.error}</div> : (
          <div>
            <div>Current stock: {inventory.currentStock}</div>
            <div>Daily consumption: {inventory.dailyConsumption}</div>
            <div>Lead time (days): {inventory.leadTimeDays}</div>
            <div>Vendor type: {inventory.vendorType}</div>
            {inventory.eoq && <div>EOQ: {inventory.eoq.eoq}</div>}
            {inventory.eoqError && <div style={{color:'red'}}>EOQ error: {inventory.eoqError}</div>}
          </div>
        )
      ) : <div>Loading inventory...</div>}

      <div style={{marginTop:10}}>
        <button onClick={onGetEOQ} disabled={loadingEoq}>{loadingEoq ? 'Calculating EOQ...' : 'Generate EOQ'}</button>
        <button onClick={onGetAdvice} disabled={loadingAdvice} style={{marginLeft:8}}>
          {loadingAdvice ? 'Generating AI...' : 'Get Agent AI Score'}
        </button>
      </div>
    </div>
  );
}
