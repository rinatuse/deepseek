const BASE_URL = import.meta.env.VITE_SUPABASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
}

const filterConfig = [
  { type: 'eq', key: 'status', column: 'status' },
  { type: 'search', key: 'search', columns: ['name', 'email'] },
  { type: 'range', key: 'budget', column: 'budget', min: 0, max: 1000000 },
]

function buildClientsParams(filters) {
  const params = new URLSearchParams()
  params.set('select', '*')
  params.set('order', 'created_at.desc')

  for (const def of filterConfig) {
    const value = filters[def.key]

    if (def.type === 'eq' && value) {
      params.set(def.column, `eq.${value}`)
    }

    if (def.type === 'search' && value && value.trim()) {
      const term = value.trim()
      const conditions = def.columns.map((col) => `${col}.ilike.*${term}*`).join(',')
      params.set('or', `(${conditions})`)
    }

    if (def.type === 'range' && value) {
      if (value.min != null && value.min > def.min) {
        params.append(def.column, `gte.${value.min}`)
      }
      if (value.max != null && value.max < def.max) {
        params.append(def.column, `lte.${value.max}`)
      }
    }
  }

  return params
}

export async function getClients(filters = {}) {

  const params = buildClientsParams(filters)

  const response = await fetch(`${BASE_URL}/rest/v1/clients?${params.toString()}`, {
    headers,
  })

  if (!response.ok) {
    throw new Error('Не удалось загрузить клиентов')
  }

  return response.json()
}