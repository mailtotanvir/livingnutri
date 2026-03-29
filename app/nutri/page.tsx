'use client';

import { useState } from 'react';

export default function NutriPage() {
  const [form, setForm] = useState({
    dietary: '',
    members: '4',
    goal: '',
    budget: '250',
  });
  const [chart, setChart] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setChart('');
    try {
      const res = await fetch('/api/nutri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setChart(data.chart);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#f0fdf4', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: '#15803d', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>🥗</span>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 18, lineHeight: 1 }}>LivingNutri</div>
            <div style={{ color: '#bbf7d0', fontSize: 12 }}>Your AI family nutritionist</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px' }}>

        {/* Intro card */}
        <div style={{ background: 'white', borderRadius: 16, padding: '16px 18px', marginBottom: 16, border: '1px solid #dcfce7' }}>
          <p style={{ margin: 0, fontSize: 14, color: '#166534', lineHeight: 1.6 }}>
            Get a personalised 7-day halal, vegan, or kosher meal plan — with grocery tips to fit your budget. Free to try.
          </p>
        </div>

        {/* Form card */}
        <div style={{ background: 'white', borderRadius: 16, padding: '20px 18px', marginBottom: 16, border: '1px solid #dcfce7' }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#14532d', marginBottom: 16 }}>Tell us about your family</div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Dietary identity</label>
            <select
              value={form.dietary}
              onChange={e => setForm({ ...form, dietary: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #d1fae5', fontSize: 15, color: '#111', background: '#f9fafb', boxSizing: 'border-box' }}
            >
              <option value="">Select dietary identity</option>
              <option value="Halal">🥩 Halal</option>
              <option value="Vegan">🌱 Vegan</option>
              <option value="Vegetarian">🥦 Vegetarian</option>
              <option value="Kosher">✡️ Kosher</option>
              <option value="Jain">🫘 Jain</option>
              <option value="No restrictions">🍽️ No restrictions</option>
            </select>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Family members</label>
            <input
              type="number" min="1" max="10"
              value={form.members}
              onChange={e => setForm({ ...form, members: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #d1fae5', fontSize: 15, color: '#111', background: '#f9fafb', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Primary health goal</label>
            <select
              value={form.goal}
              onChange={e => setForm({ ...form, goal: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #d1fae5', fontSize: 15, color: '#111', background: '#f9fafb', boxSizing: 'border-box' }}
            >
              <option value="">Select your goal</option>
              <option value="Eat healthier as a family">🥗 Eat healthier as a family</option>
              <option value="Lose weight">⚖️ Lose weight</option>
              <option value="Build energy and reduce fatigue">⚡ Build energy</option>
              <option value="Manage diabetes or blood sugar">🩺 Manage blood sugar</option>
              <option value="Save money on groceries">💰 Save money on groceries</option>
            </select>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Weekly grocery budget (CAD $)</label>
            <input
              type="number" min="50" max="1000"
              value={form.budget}
              onChange={e => setForm({ ...form, budget: e.target.value })}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #d1fae5', fontSize: 15, color: '#111', background: '#f9fafb', boxSizing: 'border-box' }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !form.dietary || !form.goal}
            style={{
              width: '100%', padding: '15px', borderRadius: 12, border: 'none',
              background: loading || !form.dietary || !form.goal ? '#d1d5db' : '#15803d',
              color: 'white', fontWeight: 700, fontSize: 16, cursor: loading ? 'wait' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {loading ? '⏳ Nutri is thinking...' : '✨ Get my family food chart'}
          </button>

          {error && <p style={{ color: '#dc2626', fontSize: 13, textAlign: 'center', marginTop: 10 }}>{error}</p>}
        </div>

        {/* Result card */}
        {chart && (
          <div style={{ background: 'white', borderRadius: 16, padding: '20px 18px', border: '1px solid #dcfce7' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#14532d', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🥗</span> Your personalised food chart
            </div>
            <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.8 }}>
              {chart.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <div key={i} style={{ fontWeight: 700, fontSize: 15, color: '#15803d', marginTop: 18, marginBottom: 6 }}>{line.replace('## ', '')}</div>;
                if (line.startsWith('# ')) return <div key={i} style={{ fontWeight: 700, fontSize: 17, color: '#14532d', marginTop: 20, marginBottom: 8 }}>{line.replace('# ', '')}</div>;
                if (line.startsWith('|')) return <div key={i} style={{ fontFamily: 'monospace', fontSize: 12, color: '#4b5563', padding: '2px 0', overflowX: 'auto' }}>{line}</div>;
                if (line.trim() === '') return <div key={i} style={{ height: 8 }} />;
                return <div key={i} style={{ marginBottom: 4 }}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</div>;
              })}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '20px 0 8px', fontSize: 12, color: '#9ca3af' }}>
          LivingNutri · Culturally intelligent nutrition · Free beta
        </div>
      </div>
    </div>
  );
}