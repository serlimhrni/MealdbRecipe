import { useEffect, useMemo, useState } from 'react'
import AreaCard from './components/AreaCard'
import CategoryCard from './components/CategoryCard'
import DetailModal from './components/DetailModal'
import ErrorMessage from './components/ErrorMessage'
import LoadingSpinner from './components/LoadingSpinner'
import PostForm from './components/PostForm'
import RecipeCard from './components/RecipeCard'
import {
  getAreas,
  getCategories,
  getMealDetail,
  getMealsByArea,
  getMealsByCategory,
  searchMeals,
} from './services/mealApi'

const PER_PAGE = 8

export default function App() {
  const [activeMenu, setActiveMenu] = useState('recipes')
  const [meals, setMeals] = useState([])
  const [categories, setCategories] = useState([])
  const [areas, setAreas] = useState([])

  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('category')
  const [selectedCategory, setSelectedCategory] = useState('Seafood')
  const [selectedArea, setSelectedArea] = useState('Canadian')
  const [page, setPage] = useState(1)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedMeal, setSelectedMeal] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    loadBaseData()
  }, [])

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1)
      fetchApiData()
    }, 450)

    return () => clearTimeout(delay)
  }, [activeMenu, search, filterType, selectedCategory, selectedArea])

  async function loadBaseData() {
    try {
      setLoading(true)
      setError(null)

      const [categoryData, areaData] = await Promise.all([
        getCategories(),
        getAreas(),
      ])

      setCategories(categoryData)
      setAreas(areaData)

      const mealData = await getMealsByCategory('Seafood')
      setMeals(mealData)
    } catch (err) {
      setError('Gagal mengambil data awal dari TheMealDB API.')
    } finally {
      setLoading(false)
    }
  }

  async function fetchApiData() {
    setLoading(true)
    setError(null)

    try {
      // IF ELSE API UNTUK LIST DATA:
      // 1. Jika menu recipes aktif dan search diisi, pakai endpoint /search.php?s=
      // 2. Jika menu recipes aktif dan filter category, pakai endpoint /filter.php?c=
      // 3. Jika menu recipes aktif dan filter area, pakai endpoint /filter.php?a=
      // 4. Jika menu categories aktif, pakai endpoint /categories.php
      // 5. Jika menu areas aktif, pakai endpoint /list.php?a=list
      if (activeMenu === 'recipes') {
        let mealData = []

        if (search.trim() !== '') {
          mealData = await searchMeals(search.trim())
        } else if (filterType === 'category') {
          mealData = await getMealsByCategory(selectedCategory)
        } else if (filterType === 'area') {
          mealData = await getMealsByArea(selectedArea)
        }

        setMeals(mealData)
      } else if (activeMenu === 'categories') {
        const categoryData = await getCategories()
        setCategories(categoryData)
      } else if (activeMenu === 'areas') {
        const areaData = await getAreas()
        setAreas(areaData)
      }
    } catch (err) {
      setMeals([])
      setError('Data tidak ditemukan atau API gagal dipanggil. Coba ubah pencarian/filter.')
    } finally {
      setLoading(false)
    }
  }

  async function handleOpenMealDetail(meal) {
    setDetailLoading(true)
    setSelectedMeal(meal)

    try {
      // IF ELSE API UNTUK CARD CLICK:
      // Card resep memanggil endpoint detail /lookup.php?i=idMeal.
      // Category dan Area card mengubah filter lalu menampilkan daftar resep.
      if (meal?.idMeal) {
        const detail = await getMealDetail(meal.idMeal)
        setSelectedMeal(detail)
      }
    } catch (err) {
      alert('Gagal mengambil detail resep.')
      setSelectedMeal(null)
    } finally {
      setDetailLoading(false)
    }
  }

  function handleCategoryClick(category) {
    setActiveMenu('recipes')
    setFilterType('category')
    setSelectedCategory(category.strCategory)
    setSearch('')
    setPage(1)
  }

  function handleAreaClick(area) {
    setActiveMenu('recipes')
    setFilterType('area')
    setSelectedArea(area.strArea)
    setSearch('')
    setPage(1)
  }

  function changeMenu(menu) {
    setActiveMenu(menu)
    setPage(1)
    setSearch('')
  }

  function resetFilter() {
    setSearch('')
    setFilterType('category')
    setSelectedCategory('Seafood')
    setSelectedArea('Canadian')
    setPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(meals.length / PER_PAGE))

  const visibleMeals = useMemo(() => {
    const start = (page - 1) * PER_PAGE
    return meals.slice(start, start + PER_PAGE)
  }, [meals, page])

  const endpointLabel = useMemo(() => {
    if (activeMenu === 'categories') return '/categories.php'
    if (activeMenu === 'areas') return '/list.php?a=list'
    if (search.trim() !== '') return '/search.php?s='
    if (filterType === 'category') return '/filter.php?c='
    return '/filter.php?a='
  }, [activeMenu, search, filterType])

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">🍜</div>
          <div>
            <h2>TheMealDB</h2>
            <p>Recipe Dashboard</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className={activeMenu === 'recipes' ? 'active' : ''} onClick={() => changeMenu('recipes')}>
            🍽️ Resep
          </button>
          <button className={activeMenu === 'categories' ? 'active' : ''} onClick={() => changeMenu('categories')}>
            📚 Kategori
          </button>
          <button className={activeMenu === 'areas' ? 'active' : ''} onClick={() => changeMenu('areas')}>
            🌍 Area
          </button>
          <button onClick={() => document.getElementById('post-api')?.scrollIntoView({ behavior: 'smooth' })}>
            ➕ POST API
          </button>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="menu-btn">☰</button>
          <div className="top-user">
            <span>Selamat memasak!</span>
            <span className="avatar">👨‍🍳</span>
          </div>
        </header>

        <section className="content">
          <div className="hero">
            <div>
              <span className="pill">ReactJS Integrasi API</span>
              <h1>Dashboard Resep Makanan TheMealDB</h1>
              <p>
                Menggunakan if else untuk menentukan endpoint API, dilengkapi search, filter kategori,
                filter area, pagination, loading, error handling, POST dummy, dan card resep yang bisa diklik.
              </p>
            </div>
          </div>

          <section className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon orange">🍽️</span>
              <div>
                <h3>{meals.length}</h3>
                <p>Total resep aktif</p>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon green">📚</span>
              <div>
                <h3>{categories.length}</h3>
                <p>Kategori makanan</p>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon yellow">🌍</span>
              <div>
                <h3>{areas.length}</h3>
                <p>Area makanan</p>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon red">🔗</span>
              <div>
                <h3>{activeMenu}</h3>
                <p>{endpointLabel}</p>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="tabs">
              <button className={activeMenu === 'recipes' ? 'active' : ''} onClick={() => changeMenu('recipes')}>
                🍽️ Resep
              </button>
              <button className={activeMenu === 'categories' ? 'active' : ''} onClick={() => changeMenu('categories')}>
                📚 Kategori
              </button>
              <button className={activeMenu === 'areas' ? 'active' : ''} onClick={() => changeMenu('areas')}>
                🌍 Area
              </button>
            </div>

            <div className="panel-header">
              <div>
                <h2>
                  {activeMenu === 'recipes'
                    ? 'Daftar Resep Makanan'
                    : activeMenu === 'categories'
                      ? 'Kategori Makanan'
                      : 'Area Asal Makanan'}
                </h2>
                <p>
                  {activeMenu === 'recipes'
                    ? 'Klik card resep untuk membuka detail bahan dan cara memasak.'
                    : 'Klik card untuk menampilkan daftar resep berdasarkan filter.'}
                </p>
              </div>
              <button className="btn ghost" onClick={fetchApiData}>Refresh</button>
            </div>

            {activeMenu === 'recipes' && (
              <div className="filters">
                <div className="field search-field">
                  <label>Search Resep</label>
                  <input
                    type="text"
                    placeholder="Cari resep, contoh: chicken, pasta, beef..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Jenis Filter</label>
                  <select value={filterType} onChange={(event) => setFilterType(event.target.value)} disabled={search.trim() !== ''}>
                    <option value="category">Kategori</option>
                    <option value="area">Area</option>
                  </select>
                </div>

                {filterType === 'category' ? (
                  <div className="field">
                    <label>Kategori</label>
                    <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} disabled={search.trim() !== ''}>
                      {categories.map((category) => (
                        <option key={category.idCategory} value={category.strCategory}>
                          {category.strCategory}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="field">
                    <label>Area</label>
                    <select value={selectedArea} onChange={(event) => setSelectedArea(event.target.value)} disabled={search.trim() !== ''}>
                      {areas.map((area) => (
                        <option key={area.strArea} value={area.strArea}>
                          {area.strArea}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button className="btn primary" onClick={resetFilter}>Reset Filter</button>
              </div>
            )}

            {loading ? (
              <LoadingSpinner text={`Memuat data ${endpointLabel}...`} />
            ) : error ? (
              <ErrorMessage message={error} onRetry={fetchApiData} />
            ) : (
              <>
                {activeMenu === 'recipes' && (
                  <>
                    <div className="result-bar">
                      <strong>
                        Menampilkan {visibleMeals.length} dari {meals.length} resep, halaman {page} dari {totalPages}
                      </strong>
                      <div className="pagination">
                        <button disabled={page === 1} onClick={() => setPage((old) => old - 1)}>‹</button>
                        <span>{page}</span>
                        <button disabled={page === totalPages} onClick={() => setPage((old) => old + 1)}>›</button>
                      </div>
                    </div>

                    <div className="card-grid recipe-grid">
                      {visibleMeals.map((meal) => (
                        <RecipeCard
                          key={meal.idMeal}
                          meal={meal}
                          filterLabel={filterType === 'category' ? selectedCategory : selectedArea}
                          onClick={handleOpenMealDetail}
                        />
                      ))}
                    </div>
                  </>
                )}

                {activeMenu === 'categories' && (
                  <div className="card-grid category-grid">
                    {categories.map((category) => (
                      <CategoryCard
                        key={category.idCategory}
                        category={category}
                        onClick={handleCategoryClick}
                      />
                    ))}
                  </div>
                )}

                {activeMenu === 'areas' && (
                  <div className="card-grid area-grid">
                    {areas.map((area) => (
                      <AreaCard
                        key={area.strArea}
                        area={area}
                        onClick={handleAreaClick}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </section>

          <PostForm />
        </section>
      </main>

      <DetailModal
        meal={selectedMeal}
        loading={detailLoading}
        onClose={() => setSelectedMeal(null)}
      />
    </div>
  )
}
