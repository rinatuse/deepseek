<script setup>
import { onMounted } from 'vue'
import { useClientsStore } from '../stores/clients.js'

const store = useClientsStore()

onMounted(() => store.fetchClients())

</script>

<template>
  <h1>Клиенты</h1>

  <p v-if="store.isLoading">Загрузка...</p>
  <p v-else-if="store.error">Ошибка: {{ store.error }}</p>

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
      <tr v-for="client in store.clients" :key="client.id">
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