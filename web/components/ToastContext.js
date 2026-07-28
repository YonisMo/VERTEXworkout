import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2)
    setToasts(t => [...t, { id, message, type }])
    // auto remove after 3.5s
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(t => t.filter(x => x.id !== id))
  }, [])

  const clearAll = useCallback(() => setToasts([]), [])

  const moveUp = useCallback((id) => {
    setToasts(prev => {
      const idx = prev.findIndex(t => t.id === id)
      if(idx <= 0) return prev
      const arr = [...prev]
      const tmp = arr[idx-1]
      arr[idx-1] = arr[idx]
      arr[idx] = tmp
      return arr
    })
  }, [])

  const moveDown = useCallback((id) => {
    setToasts(prev => {
      const idx = prev.findIndex(t => t.id === id)
      if(idx === -1 || idx >= prev.length - 1) return prev
      const arr = [...prev]
      const tmp = arr[idx+1]
      arr[idx+1] = arr[idx]
      arr[idx] = tmp
      return arr
    })
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast, clearAll, moveUp, moveDown }}>
      {children}
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        {toasts.length > 0 && (
          <div style={{display:'flex',justifyContent:'flex-end',marginBottom:8}}>
            <button className="toast-clear-all" onClick={clearAll} aria-label="Clear all notifications">مسح الكل</button>
          </div>
        )}
        {toasts.map((t, index) => (
          <div key={t.id} className={`toast ${t.type}`} role="status" aria-describedby={`toast-${t.id}`}>
            <div className="toast-message" id={`toast-${t.id}`}>{t.message}</div>
            <div className="toast-controls" role="group" aria-label="Notification controls">
              <button className="toast-btn" aria-label="Move up" onClick={() => moveUp(t.id)}>▲</button>
              <button className="toast-btn" aria-label="Move down" onClick={() => moveDown(t.id)}>▼</button>
              <button className="toast-close" aria-label="Close notification" onClick={() => removeToast(t.id)}>×</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(){
  const ctx = useContext(ToastContext)
  if(!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
