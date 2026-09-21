<script setup>
import { ref } from 'vue'
import { useClientsStore } from '../stores/clients'

const store = useClientsStore()

const searchInput = ref('')
let debounceTimer = null

const BUDGET_MIN = 0
const BUDGET_MAX = 1000000
const BUDGET_STEP = 10000

const minValue = ref(BUDGET_MIN)
const maxValue = ref(BUDGET_MAX)

function applyBudgetFilter() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    store.setFilters({ budget: {min: minValue.value, max: maxValue.value }})
  }, 400)
}

function onMinInput() {
  if (minValue.value > maxValue.value) {
    minValue.value = maxValue.value
  }
  applyBudgetFilter()
}

function onMaxInput() {
  if (maxValue.value < minValue.value) {
    maxValue.value = minValue.value
  }
  applyBudgetFilter()
}

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
  <div class="budget-range">
    <label>Бюджет: {{ minValue.toLocaleString('ru-RU') }} ₽ — {{ maxValue.toLocaleString('ru-RU') }} ₽</label>
    <input type="range" :min="BUDGET_MIN" :max="BUDGET_MAX" :step="BUDGET_STEP" v-model.number="minValue" @input="onMinInput">
    <input type="range" :min="BUDGET_MIN" :max="BUDGET_MAX" :step="BUDGET_STEP" v-model.number="maxValue" @input="onMaxInput">
  </div>
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