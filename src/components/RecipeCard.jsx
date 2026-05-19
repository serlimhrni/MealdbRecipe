export default function RecipeCard({ meal, filterLabel, onClick }) {
  return (
    <button className="recipe-card clickable-card" onClick={() => onClick(meal)}>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="card-body">
        <span className="badge">🍽️ {meal.strCategory || filterLabel || 'Recipe'}</span>
        <h3>{meal.strMeal}</h3>
        <p>ID Meal: {meal.idMeal}</p>
        <small>Klik untuk detail /lookup.php?i={meal.idMeal} →</small>
      </div>
    </button>
  )
}
