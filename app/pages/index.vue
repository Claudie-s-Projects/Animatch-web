<script setup lang="ts">
const { fetchAnimals } = useAnimals()

const { data } = await fetchAnimals({ urgence: 'critique', limit: 4 })
</script>

<template>
  <main>
    <section class="bg-gray-50 py-16 px-4 text-center">
      <h1 class="text-4xl font-bold mb-4">Trouvez votre compagnon</h1>
      <p class="text-gray-500 mb-8 max-w-xl mx-auto">
        Animatch centralise les animaux de refuges partenaires pour faciliter l'adoption.
      </p>
      <NuxtLink to="/animals" class="inline-block bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800">
        Voir tous les animaux
      </NuxtLink>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold">Animaux en attente depuis longtemps</h2>
        <NuxtLink to="/longue-duree" class="text-sm text-gray-500 hover:underline">Voir tous →</NuxtLink>
      </div>

      <div v-if="data?.data?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <AnimalCard v-for="animal in data.data" :key="animal.id" :animal="animal" />
      </div>
      <p v-else class="text-sm text-gray-400">Aucun animal en situation critique pour le moment.</p>
    </section>
  </main>
</template>
