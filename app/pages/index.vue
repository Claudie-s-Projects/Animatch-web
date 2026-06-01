<script setup lang="ts">
const { fetchAnimals } = useAnimals()

const { data } = await fetchAnimals({ urgence: 'critique', limit: 4 })
</script>

<template>
  <main>
    <section class="bg-creme-50 py-16 px-4 text-center">
      <h1 class="text-4xl font-bold mb-4">Trouvez votre compagnon</h1>
      <p class="text-gray-500 mb-8 max-w-xl mx-auto">
        Plus besoin de chercher pour adopter.
      </p>
      <NuxtLink to="/animals" class="inline-block bg-blush-400 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blush-500">
        Voir tous les animaux
      </NuxtLink>
    </section>

    <section class="max-w-6xl mx-auto px-4 py-12 text-center">
      <h2 class="text-xl font-bold mb-4">Animaux en attente depuis longtemps</h2>
      <NuxtLink to="/longue-duree" class="inline-block bg-white border text-sm px-5 py-2 rounded-xl hover:bg-gray-100 mb-6">Voir tous les animaux →</NuxtLink>

      <div v-if="data?.data?.length" class="flex flex-wrap justify-center gap-6">
        <div v-for="animal in data.data" :key="animal.id" class="w-full sm:w-64">
          <AnimalCard :animal="animal" />
        </div>
      </div>
      <p v-else class="text-sm text-gray-400">Aucun animal en situation critique pour le moment.</p>
    </section>

    <section class="bg-creme-50 border-y px-4 py-10 text-center">
      <h2 class="text-xl font-bold mb-2">Prêt à adopter ?</h2>
      <p class="text-sm text-gray-500 mb-4">Consultez nos guides pratiques pour bien préparer l'arrivée de votre animal.</p>
      <NuxtLink to="/guides" class="inline-block bg-white border text-sm px-5 py-2 rounded-xl hover:bg-gray-100">
        Voir les guides d'adoption →
      </NuxtLink>
    </section>
  </main>
</template>
