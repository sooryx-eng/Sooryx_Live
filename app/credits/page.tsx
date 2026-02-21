"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type Transaction = {
  id: string;
  type: string;
  amount: number;
  balanceAfter: number;
  createdAt: string;
};

export default function CreditsPage() {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch('/api/credits');
        if (res.status === 401) {
          if (isMounted) setUnauthorized(true);
          return;
        }
        if (!res.ok) throw new Error('Failed to load balance');
        const data = await res.json();
        if (isMounted) setBalance(Number(data?.balance ?? 0));
        const history = await fetch('/api/credits/history');
        if (history.ok) {
          const historyData = await history.json();
          if (isMounted) setTransactions(historyData.transactions || []);
        }
      } catch (e: any) {
        if (isMounted) setError(e?.message ?? 'Failed to load');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    void load();
    return () => { isMounted = false; };
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h1>Solar Credits</h1>
      {loading && <p>Loading...</p>}
      {unauthorized && (
        <p>
          Please <Link href="/auth/signin">sign in</Link> to view your credits.
        </p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && !unauthorized && <p>Balance: ₹{balance.toLocaleString('en-IN')}</p>}
      <TopUp />
      <Transactions items={transactions} />
    </div>
  );
}

function TopUp() {
  async function startCheckout() {
    const res = await fetch('/api/stripe/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 10 }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert('Failed to create checkout session');
  }
  return <button onClick={() => void startCheckout()}>Top up with ₹500</button>;
}

function Transactions({ items }: { items: Transaction[] }) {
  return (
    <div>
      <h2>Recent activity</h2>
      {items.length === 0 && <p>No transactions yet.</p>}
      {items.length > 0 && (
        <ul>
          {items.slice(0, 10).map((item) => (
            <li key={item.id}>
              {item.type} — {item.amount} (balance {item.balanceAfter})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
