<script setup lang="ts">
import type { AnimalFilters, AnimalsResponse } from '~/composables/useAnimals'

const { public: { apiBase } } = useRuntimeConfig()

const filters = reactive<AnimalFilters>({ page: 1, limit: 20 })

const { data, status } = await useFetch<AnimalsResponse>('/animals', {
  baseURL: apiBase,
  query: filters,
})

function applyFilters(newFilters: Omit<AnimalFilters, 'page' | 'limit'>) {
  Object.assign(filters, newFilters, { page: 1 })
}

function goTo(p: number) {
  filters.page = p
}

const totalPages = computed(() => data.value ? Math.ceil(data.value.total / filters.limit!) : 0)
</script>

<template>
  <main class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Animaux disponibles</h1>

    <AnimalFilters @change="applyFilters" />

    <div v-if="status === 'pending'" class="text-center py-12 text-gray-400">Chargement...</div>

    <div v-else-if="data">
      <p class="text-sm text-gray-500 mb-4">{{ data.total }} animal(aux) trouvé(s)</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimalCard v-for="animal in data.data" :key="animal.id" :animal="animal" />
      </div>

      <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-10">
        <button
          v-for="p in totalPages"
          :key="p"
          @click="goTo(p)"
          :class="[
            'px-3 py-1 rounded text-sm',
            p === filters.page ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          ]"
        >
          {{ p }}
        </button>
      </div>
    </div>
  </main>
</template>
