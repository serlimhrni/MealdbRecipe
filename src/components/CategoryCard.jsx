export default function CategoryCard({ category, onClick }) {
  return (
    <button className="category-card clickable-card" onClick={() => onClick(category)}>
      <img src={category.strCategoryThumb} alt={category.strCategory} />
      <div>
        <h3>{category.strCategory}</h3>
        <p>{category.strCategoryDescription}</p>
        <small>Klik untuk filter kategori {category.strCategory} →</small>
      </div>
    </button>
  )
}
