import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', weight: '', height: '', age: '', gender: '', goal: '', subscription: '', paymentStatus: '', medical: '' });
  const [searchName, setSearchName] = useState('');
  const [results, setResults] = useState([]);
  const [msg, setMsg] = useState('');
n  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
n  const register = async (e) => {
    e.preventDefault();
    setMsg('Saving...');
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const j = await res.json();
    setMsg(j.message || 'Done');
  };
n  const search = async (e) => {
    e && e.preventDefault();
    const res = await fetch('/api/search?name=' + encodeURIComponent(searchName));
    const j = await res.json();
    setResults(j.results || []);
  };
n  return (
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>VERTEXworkout — Admin (Web)</h1>
n      <section style={{ marginBottom: 24 }}>
        <h2>Register Client</h2>
        <form onSubmit={register}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required /> <br/>
          <input name="phone" placeholder="Phone" onChange={handleChange} /> <br/>
          <input name="email" placeholder="Email" onChange={handleChange} /> <br/>
          <input name="weight" placeholder="Weight (kg)" onChange={handleChange} /> <br/>
          <input name="height" placeholder="Height (cm)" onChange={handleChange} /> <br/>
          <input name="age" placeholder="Age" onChange={handleChange} /> <br/>
          <input name="gender" placeholder="Gender" onChange={handleChange} /> <br/>
          <input name="goal" placeholder="Goal" onChange={handleChange} /> <br/>
          <input name="subscription" placeholder="Subscription Type" onChange={handleChange} /> <br/>
          <input name="paymentStatus" placeholder="Payment Status" onChange={handleChange} /> <br/>
          <input name="medical" placeholder="Medical Conditions" onChange={handleChange} /> <br/>
          <button type="submit">Register</button>
        </form>
        <div>{msg}</div>
      </section>
n      <section style={{ marginBottom: 24 }}>
        <h2>Search Client</h2>
        <form onSubmit={search}>
          <input value={searchName} onChange={e => setSearchName(e.target.value)} placeholder="Name to search" />
          <button type="submit">Search</button>
        </form>
        <div>
          {results.length === 0 ? (<div>No results</div>) : (
            results.map((r, i) => (<pre key={i} style={{background:'#f6f6f6',padding:10}}>{r}</pre>))
          )}
        </div>
      </section>
n    </div>
  );
}
