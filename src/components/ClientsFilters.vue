<script setup>
import { ref } from 'vue'
import { useClientsStore } from '../stores/clients'

const store = useClientsStore()

const searchInput = ref('')
let debounceTimer = null

function onSearchInput() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    store.setFilters({ search: searchInput.value })
  }, 400)
}

  function onStatusChange(event) {
    store.setFilters({ status: event.target.value })
  }
</script>

<template>
  <div class="filters">
    <input type="text" v-model="searchInput" @input="onSearchInput" placeholder="Поиск по имени или email">
    <select name="" id="" @change="onStatusChange">
      <option value="">Все статусы</option>
      <option value="lead">Lead</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
 </div>
</template>