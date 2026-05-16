<script setup lang="ts">
const { isLoggedIn } = useAuth()
const { fetchFavoris, removeFavori } = useFavoris()

if (!isLoggedIn.value) {
  await navigateTo('/login')
}

const favoris = ref(await fetchFavoris())
const animaux = computed(() => favoris.value.map(f => f.animal))

async function retirerFavori(animalId: number) {
  await removeFavori(animalId)
  favoris.value = favoris.value.filter(f => f.animal.id !== animalId)
}
</script>

<template>
  <main class="max-w-5xl mx-auto px-4 py-8">
    <NuxtLink to="/" class="text-sm text-gray-500 hover:underline mb-6 inline-block">← Retour à l'accueil</NuxtLink>
    <h1 class="text-2xl font-bold mb-6">Mes favoris</h1>

    <p v-if="animaux.length === 0" class="text-gray-500">
      Tu n'as pas encore d'animaux favoris.
    </p>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimalCard
        v-for="animal in animaux"
        :key="animal.id"
        :animal="animal"
        :show-favori="true"
        :is-favori="true"
        @toggle="retirerFavori(animal.id)"
      />
    </div>
  </main>
</template>
