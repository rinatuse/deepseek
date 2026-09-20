import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getClients } from '../api/clients'

export const useClientsStore = defineStore('clients', () => {
  const clients = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchClients() {
    isLoading.value = true
    error.value = null
    try {
      const data = await getClients()
      clients.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return { clients, isLoading, error, fetchClients }
})