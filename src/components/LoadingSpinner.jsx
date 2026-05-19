export default function LoadingSpinner({ text = 'Memuat data resep...' }) {
  return (
    <div className="loading-box">
      <div>
        <div className="spinner"></div>
        <h3>{text}</h3>
        <p>Data sedang diambil dari TheMealDB API.</p>
      </div>
    </div>
  )
}
