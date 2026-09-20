const BASE_URL = import.meta.env.VITE_SUPABASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
}

export async function getClients(filters = {}) {
  const params = new URLSearchParams()
  params.set('select', '*')
  params.set('order', 'created_at.desc')

  if (filters.status) {
    params.set('status', `eq.${filters.status}`)
  }

  if (filters.search && filters.search.trim()) {
    const term = filters.search.trim()
    params.set('or', `(name.ilike.*${term}*,email.ilike.*${term}*)`)
  }

  const response = await fetch(`${BASE_URL}/rest/v1/clients?${params.toString()}`, {
    headers,
  })

  if (!response.ok) {
    throw new Error('Не удалось загрузить клиентов')
  }

  return response.json()
}