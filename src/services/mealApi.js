import axios from 'axios'

const API_BASE = 'https://www.themealdb.com/api/json/v1/1'

export async function searchMeals(keyword = '') {
  const response = await axios.get(`${API_BASE}/search.php`, {
    params: { s: keyword },
  })
  return response.data.meals || []
}

export async function getMealsByCategory(category) {
  const response = await axios.get(`${API_BASE}/filter.php`, {
    params: { c: category },
  })
  return response.data.meals || []
}

export async function getMealsByArea(area) {
  const response = await axios.get(`${API_BASE}/filter.php`, {
    params: { a: area },
  })
  return response.data.meals || []
}

export async function getCategories() {
  const response = await axios.get(`${API_BASE}/categories.php`)
  return response.data.categories || []
}

export async function getAreas() {
  const response = await axios.get(`${API_BASE}/list.php`, {
    params: { a: 'list' },
  })
  return response.data.meals || []
}

export async function getMealDetail(idMeal) {
  const response = await axios.get(`${API_BASE}/lookup.php`, {
    params: { i: idMeal },
  })
  return response.data.meals?.[0] || null
}

export async function sendDummyRecipe(payload) {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', payload)
  return response.data
}
