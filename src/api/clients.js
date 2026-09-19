const BASE_URL = import.meta.env.VITE_SUPABASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
}

export async function getClients() {
  const response = await fetch(`${BASE_URL}/rest/v1/clients?select=*`, {
    headers,
  })

  if (!response.ok) {
    throw new Error('Не удалось загрузить клиентов')
  }

  return response.json()
}