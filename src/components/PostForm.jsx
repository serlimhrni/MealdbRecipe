import { useState } from 'react'
import { sendDummyRecipe } from '../services/mealApi'

export default function PostForm() {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    note: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      await sendDummyRecipe({
        title: formData.title,
        body: `Nama: ${formData.name}. Catatan: ${formData.note}`,
        userId: 1,
      })

      setMessage({ type: 'success', text: 'Data berhasil dikirim dengan method POST.' })
      setFormData({ title: '', name: '', note: '' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Data gagal dikirim.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="panel" id="post-api">
      <div className="panel-header">
        <div>
          <h2>Latihan POST API</h2>
          <p>Form ini mengirim request resep dummy ke JSONPlaceholder menggunakan axios.post().</p>
        </div>
      </div>

      <form className="post-form" onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Nama resep"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          name="name"
          type="text"
          placeholder="Nama pengirim"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="note"
          type="text"
          placeholder="Catatan resep"
          value={formData.note}
          onChange={handleChange}
          required
        />

        <button className="btn primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Mengirim...' : 'Simpan Data'}
        </button>
      </form>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </section>
  )
}
