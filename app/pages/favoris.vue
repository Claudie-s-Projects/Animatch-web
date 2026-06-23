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
  <div class="px-8 pt-6 pb-4">
    <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-sm text-brun-400 hover:text-blush-500 group">
      <span class="inline-block group-hover:-translate-x-1 transition-transform duration-150">‹</span>
      Accueil
    </NuxtLink>
  </div>
  <main class="max-w-5xl mx-auto px-4 pb-8">
    <h1 class="text-2xl font-bold text-brun-800 mb-6">Mes favoris</h1>

    <p v-if="animaux.length === 0" class="text-brun-400">
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
