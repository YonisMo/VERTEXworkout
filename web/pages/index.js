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
    if(!form.name){ setError('الاسم مطلوب'); addToast('الاسم مطلوب','error'); return }
    setLoading(true); setMsg('')
    try{
      const res = await fetch('/api/register',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      const j = await res.json()
      if(res.ok){ setMsg('تم حفظ العميل'); addToast('تم حفظ العميل','success'); setForm({ name:'', phone:'', email:'', weight:'', height:'', age:'', gender:'', goal:'', subscription:'', paymentStatus:'', medical:'' }); setResults([]) }
      else { setError(j.message || 'فشل الحفظ'); addToast(j.message || 'فشل الحفظ','error') }
    }catch(err){ setError(String(err)); addToast('خطأ في الشبكة','error') }
    setLoading(false)
  }

  const search = async (e)=>{
    e && e.preventDefault(); setLoading(true); setError('')
    try{
      const res = await fetch('/api/search?name='+encodeURIComponent(searchName))
      const j = await res.json()
      setResults(j.results || [])
      if((j.results || []).length === 0) addToast('لا توجد نتائج','info')
    }catch(err){ setError(String(err)); addToast('فشل البحث','error') }
    setLoading(false)
  }

  return (
    <div className="container" dir="rtl">
      <h1 className="small">VERTEXworkout — لوحة التحكم</h1>

      <div className="card" aria-label="نموذج تسجيل العميل">
        <h2>تسجيل عميل</h2>
        <form onSubmit={register} aria-describedby="register-help">
          <label className="small" htmlFor="name">الاسم الكامل*</label>
          <div className="form-row"><input id="name" name="name" aria-required="true" aria-label="الاسم الكامل" placeholder="الاسم الكامل*" value={form.name} onChange={handleChange} required /></div>

          <label className="small" htmlFor="contact">بيانات الاتصال</label>
          <div className="form-row"><input id="phone" name="phone" aria-label="الهاتف" placeholder="الهاتف" value={form.phone} onChange={handleChange} /><input id="email" name="email" aria-label="البريد الإلكتروني" placeholder="البريد الإلكتروني" value={form.email} onChange={handleChange} /></div>

          <label className="small" htmlFor="phys">البيانات البدنية</label>
          <div className="form-row"><input id="weight" name="weight" aria-label="الوزن بالكيلوغرام" type="number" placeholder="الوزن (كجم)" value={form.weight} onChange={handleChange} /><input id="height" name="height" aria-label="الطول بالسنتيمتر" type="number" placeholder="الطول (سم)" value={form.height} onChange={handleChange} /></div>

          <div className="form-row"><input id="age" name="age" aria-label="العمر" type="number" placeholder="العمر" value={form.age} onChange={handleChange} /><input id="gender" name="gender" aria-label="الجنس" placeholder="الجنس" value={form.gender} onChange={handleChange} /></div>

          <div className="form-row"><input id="goal" name="goal" aria-label="الهدف" placeholder="الهدف" value={form.goal} onChange={handleChange} /><input id="subscription" name="subscription" aria-label="نوع الاشتراك" placeholder="نوع الاشتراك" value={form.subscription} onChange={handleChange} /></div>

          <div className="form-row"><input id="paymentStatus" name="paymentStatus" aria-label="حالة الدفع" placeholder="حالة الدفع" value={form.paymentStatus} onChange={handleChange} /><input id="medical" name="medical" aria-label="الحالات الطبية" placeholder="الحالات الطبية" value={form.medical} onChange={handleChange} /></div>

          <div className="small">مؤشر كتلة الجسم: {bmi}</div>
          <div style={{marginTop:10}}>
            <button type="submit" disabled={loading} aria-disabled={loading}>{loading? 'جاري الحفظ...':'تسجيل'}</button>
          </div>
          {error && <div className="small" style={{color:'crimson',marginTop:8}}>{error}</div>}
          {msg && <div className="small" style={{color:'green',marginTop:8}}>{msg}</div>}
          <div id="register-help" className="small">استخدم النموذج لإضافة عميل جديد. الحقول المطلوبة مؤشر عليها. اختصارات: Ctrl/Cmd+K للبحث، Alt+N للتركيز على الاسم.</div>
        </form>
      </div>

      <div className="card" aria-label="بحث عن عملاء">
        <h2>بحث عن عميل</h2>
        <form onSubmit={search} style={{marginBottom:8}}>
          <div className="form-row"><input id="search" aria-label="اسم للبحث" value={searchName} onChange={e=>setSearchName(e.target.value)} placeholder="اسم العميل للبحث" /> <button type="submit" disabled={loading} aria-disabled={loading}>{loading? '...' : 'بحث'}</button></div>
        </form>
        {results.length === 0 ? (<div className="small">لا توجد نتائج</div>) : (
          results.map((r,i)=> (<div key={i} className="result-pre">{r}</div>))
        )}
        {error && <div className="small" style={{color:'crimson'}}>{error}</div>}
      </div>

    </div>
  )
}
