export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box">
      <h3>Terjadi Error</h3>
      <p>{message}</p>
      <button className="btn primary" onClick={onRetry}>Coba Lagi</button>
    </div>
  )
}
