<script setup>
import {onMounted} from 'vue'
import {getClients} from '../api/clients.js'

onMounted(
  async () => {
    const data = await getClients()
    console.log(data)
  }
)
</script>

<template>
  <h1>Список клиентов (заглушка)</h1>
</template>