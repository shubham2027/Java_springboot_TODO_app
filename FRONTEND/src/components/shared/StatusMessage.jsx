export function StatusMessage({ kind = 'info', text }) {
  if (!text) {
    return null
  }

  return <p className={`status ${kind}`}>{text}</p>
}
