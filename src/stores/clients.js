import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getClients } from '../api/clients'

export const useClientsStore = defineStore('clients', () => {
  const clients = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const filters = ref({ status: '', search: '', budget: { min: 0, max: 1000000 } })

  async function fetchClients() {
    isLoading.value = true
    error.value = null
    try {
      const data = await getClients(filters.value)
      clients.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  function setFilters(newFilters) {
    filters.value = { ...filters.value, ...newFilters }
    fetchClients()
  }

  return { clients, isLoading, error, fetchClients, setFilters }
})