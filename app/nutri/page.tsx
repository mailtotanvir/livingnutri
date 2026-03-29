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
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-800 mb-2">LivingNutri</h1>
          <p className="text-green-700 text-lg">Your culturally intelligent AI nutritionist</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Tell us about your family</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dietary identity</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={form.dietary}
                onChange={e => setForm({ ...form, dietary: e.target.value })}
              >
                <option value="">Select your dietary identity</option>
                <option value="Halal">Halal</option>
                <option value="Vegan">Vegan</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Kosher">Kosher</option>
                <option value="Jain">Jain</option>
                <option value="No restrictions">No restrictions</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of family members</label>
              <input
                type="number" min="1" max="10"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={form.members}
                onChange={e => setForm({ ...form, members: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary health goal</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={form.goal}
                onChange={e => setForm({ ...form, goal: e.target.value })}
              >
                <option value="">Select your goal</option>
                <option value="Eat healthier as a family">Eat healthier as a family</option>
                <option value="Lose weight">Lose weight</option>
                <option value="Build energy and reduce fatigue">Build energy and reduce fatigue</option>
                <option value="Manage diabetes or blood sugar">Manage diabetes or blood sugar</option>
                <option value="Save money on groceries">Save money on groceries</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weekly grocery budget (CAD $)</label>
              <input
                type="number" min="50" max="1000"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={form.budget}
                onChange={e => setForm({ ...form, budget: e.target.value })}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !form.dietary || !form.goal}
              className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl transition-colors"
            >
              {loading ? 'Nutri is preparing your food chart...' : 'Get my family food chart'}
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
        </div>

        {chart && (
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-8">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Your personalised food chart</h2>
            <div className="text-gray-700 leading-relaxed">
              {chart.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-green-800 mt-6 mb-2">{line.replace('## ', '')}</h2>;
                if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-green-800 mt-6 mb-2">{line.replace('# ', '')}</h1>;
                if (line.trim() === '') return <br key={i} />;
                return <p key={i} className="mb-1">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}