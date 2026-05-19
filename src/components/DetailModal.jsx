function getIngredients(meal) {
  const ingredients = []

  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim())
    }
  }

  return ingredients
}

export default function DetailModal({ meal, loading, onClose }) {
  if (!meal && !loading) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {loading ? (
          <div className="loading-box modal-loading">
            <div>
              <div className="spinner"></div>
              <h3>Mengambil detail resep...</h3>
              <p>Endpoint detail dipanggil saat card diklik.</p>
            </div>
          </div>
        ) : (
          <div className="detail-grid">
            <img className="detail-img" src={meal.strMealThumb} alt={meal.strMeal} />

            <div className="detail-content">
              <span className="detail-label">Detail Recipe API</span>
              <h2>{meal.strMeal}</h2>

              <div className="detail-tags">
                <span>Kategori: {meal.strCategory || '-'}</span>
                <span>Area: {meal.strArea || '-'}</span>
                <span>ID: {meal.idMeal}</span>
              </div>

              <h3>Bahan-bahan</h3>
              <ul className="ingredients">
                {getIngredients(meal).map((ingredient) => (
                  <li key={ingredient}>🥕 {ingredient}</li>
                ))}
              </ul>

              <h3>Cara Memasak</h3>
              <p className="instructions">{meal.strInstructions || 'Instruksi tidak tersedia.'}</p>

              <p className="detail-note">
                Card ini diklik lalu memanggil endpoint detail:
                <code> /lookup.php?i={meal.idMeal}</code>
              </p>

              {meal.strYoutube && (
                <a className="youtube-link" href={meal.strYoutube} target="_blank" rel="noreferrer">
                  ▶ Lihat Video Tutorial
                </a>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
