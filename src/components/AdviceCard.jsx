import React from 'react';

export default function AdviceCard({ data }) {
  if (data.error) return <div style={{color:'red'}}>AI Error: {data.error}</div>;
  return (
    <div style={{border:'1px solid #333', padding:12, marginTop:12, background:'#fafafa'}}>
      <h4>Procurement Advice (Risk: {data.risk_score})</h4>
      <div><strong>EOQ:</strong> {data.eoq}</div>
      <div><strong>Narrative:</strong> {data.narrative}</div>
      <div><strong>Actions:</strong>
        <ul>
          {data.actions?.map((a,i) => <li key={i}>{a.action} {a.qty} — {a.supplier_type} — {a.reason}</li>)}
        </ul>
      </div>
    </div>
  );
}
