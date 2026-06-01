<script setup lang="ts">
const { fetchAnimals } = useAnimals()

const [{ data: critique }, { data: urgent }, { data: prioritaire }] = await Promise.all([
  fetchAnimals({ urgence: 'critique', limit: 100 }),
  fetchAnimals({ urgence: 'urgent', limit: 100 }),
  fetchAnimals({ urgence: 'prioritaire', limit: 100 }),
])

const sections = computed(() => [
  { label: 'Critique — plus de 90 jours', niveau: 'critique', animaux: critique.value?.data ?? [] },
  { label: 'Urgent — 60 à 90 jours', niveau: 'urgent', animaux: urgent.value?.data ?? [] },
  { label: 'Prioritaire — 30 à 60 jours', niveau: 'prioritaire', animaux: prioritaire.value?.data ?? [] },
])
</script>

<template>
  <main class="max-w-6xl mx-auto px-4 py-8">
    <NuxtLink to="/animals" class="text-sm text-gray-500 hover:underline mb-6 inline-block">← Retour au catalogue</NuxtLink>
    <h1 class="text-2xl font-bold mb-2">Animaux en longue durée</h1>
    <p class="text-sm text-gray-500 mb-8">Ces animaux attendent une famille depuis plus de 30 jours.</p>

    <div v-for="section in sections" :key="section.niveau" class="mb-12">
      <h2 class="text-lg font-semibold mb-4 capitalize">{{ section.label }}</h2>

      <div v-if="section.animaux.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimalCard v-for="animal in section.animaux" :key="animal.id" :animal="animal" />
      </div>
      <p v-else class="text-sm text-gray-400">Aucun animal dans cette catégorie.</p>
    </div>
  </main>
</template>
