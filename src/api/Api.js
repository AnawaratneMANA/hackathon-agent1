const SPRING_BASE = 'http://localhost:8080';
const FASTAPI_BASE = 'http://localhost:8000';

export async function loginUser(username, password) {
  // Simple demo: map username->sme. In real app call auth endpoint.
  if (username === 'demo' && password === 'demo') {
    return { smeId: 'SME_001', name: 'Anami Traders' };
  }
  throw new Error('Invalid credentials');
}

export async function fetchItems(smeId) {
  const url = `${SPRING_BASE}/api/items?sme=${encodeURIComponent(smeId)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // array of ItemListDTO
}

export async function fetchInventoryStatus(smeId, itemCode) {
  const url = `${SPRING_BASE}/api/inventory/status/${encodeURIComponent(itemCode)}`;
  const res = await fetch(url, { headers: { 'x-sme-code': smeId }});
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // InventoryStatusDTO
}

export async function fetchEOQ(smeId, itemCode) {
  const url = `${SPRING_BASE}/api/calc/eoq/${encodeURIComponent(itemCode)}`;
  const res = await fetch(url, { headers: { 'x-sme-code': smeId }});
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // EOQResponseDTO
}

export async function fetchAgentAdvice(smeId, itemCode) {
  const url = `${FASTAPI_BASE}/get-procurement-advice`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ sme_id: smeId, item_id: itemCode })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchSupplierRiskAssessment(smeId, itemCode) {
  const url = `${FASTAPI_BASE}/api/assess-supplier-risk?item_id=${encodeURIComponent(itemCode)}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'x-sme-code': smeId }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
