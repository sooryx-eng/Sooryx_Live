"use client";
import { useState } from 'react';

export default function AdminUsersPage() {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState('');

  async function adjust() {
    const res = await fetch('/api/admin/adjust-balance', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, amount, reason }) });
    const data = await res.json();
    if (res.ok) alert('Balance updated: ' + data.balance);
    else alert('Error: ' + (data.error || 'unknown'));
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h1>Admin — Adjust User Balance</h1>
      <label>
        User ID
        <input value={userId} onChange={(e) => setUserId(e.target.value)} />
      </label>
      <label>
        Amount (positive to credit, negative to debit)
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </label>
      <label>
        Reason
        <input value={reason} onChange={(e) => setReason(e.target.value)} />
      </label>
      <button onClick={() => void adjust()}>Adjust Balance</button>
    </div>
  );
}
