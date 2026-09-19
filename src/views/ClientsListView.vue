<script setup>
import {onMounted, ref} from 'vue'
import {getClients} from '../api/clients.js'

const clients = ref([])
const isLoading = ref(true)
const error = ref(null)

onMounted(
  async () => {
    try {
      clients.value = await getClients()
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }
)
</script>

<template>
  <h1>Клиенты</h1>

  <p v-if="isLoading">Загрузка...</p>
  <p v-else-if="error">Ошибка: {{ error }}</p>

  <table v-else>
    <thead>
      <tr>
        <th>Имя</th>
        <th>Email</th>
        <th>Телефон</th>
        <th>Компания</th>
        <th>Статус</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in clients" :key="client.id">
        <td>{{ client.name }}</td>
        <td>{{ client.email  }}</td>
        <td>{{ client.phone  }}</td>
        <td>{{ client.company }}</td>
        <td>{{ client.status }}</td>
      </tr>
    </tbody>
  </table>

</template>

<style scoped>

</style>