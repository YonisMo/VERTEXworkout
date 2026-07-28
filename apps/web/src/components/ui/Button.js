export default function Button({ children, ...props }) {
  return (
    <button {...props} style={{ padding: '8px 12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
      {children}
    </button>
  )
}
