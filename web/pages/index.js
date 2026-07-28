import { useState, useEffect } from 'react'
import { useToast } from '../components/ToastContext'

export default function Home(){
  const [form,setForm] = useState({ name:'', phone:'', email:'', weight:'', height:'', age:'', gender:'', goal:'', subscription:'', paymentStatus:'', medical:'' })
  const [bmi,setBmi] = useState('N/A')
  const [searchName,setSearchName] = useState('')
  const [results,setResults] = useState([])
  const [msg,setMsg] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')

  const { addToast } = useToast()

  useEffect(()=>{
    const w = parseFloat(form.weight) || 0
    const h = (parseFloat(form.height) || 0) / 100
    if(w > 0 && h > 0){
      setBmi((w / (h*h)).toFixed(2))
    } else setBmi('N/A')
  },[form.weight, form.height])

  useEffect(()=>{
    const onKey = (e) => {
      // Ctrl/Cmd+K to focus search
      if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){
        e.preventDefault()
        const s = document.getElementById('search')
        s && s.focus()
      }
      // Alt+N to focus name
      if(e.altKey && e.key.toLowerCase() === 'n'){
        e.preventDefault()
        const n = document.getElementById('name')
        n && n.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  },[])

  const handleChange = (e)=> setForm({...form, [e.target.name]: e.target.value})

  const register = async (e)=>{
    e.preventDefault(); setError('');
    if(!form.name){ setError('Name is required'); addToast('Name is required','error'); return }
    setLoading(true); setMsg('')
    try{
      const res = await fetch('/api/register',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      const j = await res.json()
      if(res.ok){ setMsg('Client saved'); addToast('Client saved','success'); setForm({ name:'', phone:'', email:'', weight:'', height:'', age:'', gender:'', goal:'', subscription:'', paymentStatus:'', medical:'' }); setResults([]) }
      else { setError(j.message || 'Save failed'); addToast(j.message || 'Save failed','error') }
    }catch(err){ setError(String(err)); addToast('Network error','error') }
    setLoading(false)
  }

  const search = async (e)=>{
    e && e.preventDefault(); setLoading(true); setError('')
    try{
      const res = await fetch('/api/search?name='+encodeURIComponent(searchName))
      const j = await res.json()
      setResults(j.results || [])
      if((j.results || []).length === 0) addToast('لا توجد نتائج','info')
    }catch(err){ setError(String(err)); addToast('Search failed','error') }
    setLoading(false)
  }

  return (
    <div className="container">
      <h1 className="small">VERTEXworkout — Admin (Web)</h1>

      <div className="card" aria-label="Register client form">
        <h2>Register Client</h2>
        <form onSubmit={register} aria-describedby="register-help">
          <label className="small" htmlFor="name">Full name*</label>
          <div className="form-row"><input id="name" name="name" aria-required="true" aria-label="Full name" placeholder="Full name*" value={form.name} onChange={handleChange} required /></div>

          <label className="small" htmlFor="contact">Contact</label>
          <div className="form-row"><input id="phone" name="phone" aria-label="Phone" placeholder="Phone" value={form.phone} onChange={handleChange} /><input id="email" name="email" aria-label="Email" placeholder="Email" value={form.email} onChange={handleChange} /></div>

          <label className="small" htmlFor="phys">Physical</label>
          <div className="form-row"><input id="weight" name="weight" aria-label="Weight in kilograms" type="number" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} /><input id="height" name="height" aria-label="Height in centimeters" type="number" placeholder="Height (cm)" value={form.height} onChange={handleChange} /></div>

          <div className="form-row"><input id="age" name="age" aria-label="Age" type="number" placeholder="Age" value={form.age} onChange={handleChange} /><input id="gender" name="gender" aria-label="Gender" placeholder="Gender" value={form.gender} onChange={handleChange} /></div>

          <div className="form-row"><input id="goal" name="goal" aria-label="Goal" placeholder="Goal" value={form.goal} onChange={handleChange} /><input id="subscription" name="subscription" aria-label="Subscription Type" placeholder="Subscription Type" value={form.subscription} onChange={handleChange} /></div>

          <div className="form-row"><input id="paymentStatus" name="paymentStatus" aria-label="Payment Status" placeholder="Payment Status" value={form.paymentStatus} onChange={handleChange} /><input id="medical" name="medical" aria-label="Medical Conditions" placeholder="Medical Conditions" value={form.medical} onChange={handleChange} /></div>

          <div className="small">BMI: {bmi}</div>
          <div style={{marginTop:10}}>
            <button type="submit" disabled={loading} aria-disabled={loading}>{loading? 'Saving...':'Register'}</button>
          </div>
          {error && <div className="small" style={{color:'crimson',marginTop:8}}>{error}</div>}
          {msg && <div className="small" style={{color:'green',marginTop:8}}>{msg}</div>}
          <div id="register-help" className="small">Use the form to add a new client. Required fields are labeled. Shortcuts: Ctrl/Cmd+K focus search, Alt+N focus name.</div>
        </form>
      </div>

      <div className="card" aria-label="Search clients">
        <h2>Search Client</h2>
        <form onSubmit={search} style={{marginBottom:8}}>
          <div className="form-row"><input id="search" aria-label="Name to search" value={searchName} onChange={e=>setSearchName(e.target.value)} placeholder="Name to search" /> <button type="submit" disabled={loading} aria-disabled={loading}>{loading? '...' : 'Search'}</button></div>
        </form>
        {results.length === 0 ? (<div className="small">No results</div>) : (
          results.map((r,i)=> (<div key={i} className="result-pre">{r}</div>))
        )}
        {error && <div className="small" style={{color:'crimson'}}>{error}</div>}
      </div>

    </div>
  )
}
