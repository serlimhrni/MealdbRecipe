export default function AreaCard({ area, onClick }) {
  return (
    <button className="area-card clickable-card" onClick={() => onClick(area)}>
      <div className="area-icon">🌍</div>
      <div>
        <h3>{area.strArea}</h3>
        <p>Menampilkan resep berdasarkan area asal makanan.</p>
        <small>Klik untuk filter area {area.strArea} →</small>
      </div>
    </button>
  )
}
