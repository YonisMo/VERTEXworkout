import { useEffect } from 'react'

export default function Toast({ toast, onClose }){
  useEffect(()=>{
    if(!toast) return
    const t = setTimeout(()=> onClose(), 3500)
    return ()=> clearTimeout(t)
  },[toast, onClose])

  if(!toast) return null
  const { message, type='info' } = toast
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      <div className={`toast ${type}`} role="status">
        <div className="toast-message">{message}</div>
        <button className="toast-close" aria-label="Close notification" onClick={onClose}>×</button>
      </div>
    </div>
  )
}
