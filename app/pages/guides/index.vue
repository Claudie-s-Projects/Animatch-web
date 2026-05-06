<script setup lang="ts">
const { fetchGuides } = useGuides()
const { data: guides } = await fetchGuides()

const parThematique = computed(() => {
  if (!guides.value) return {}
  return guides.value.reduce((acc, guide) => {
    if (!acc[guide.thematique]) acc[guide.thematique] = []
    acc[guide.thematique].push(guide)
    return acc
  }, {} as Record<string, typeof guides.value>)
})

const labels: Record<string, string> = {
  preparation: 'Préparer l\'arrivée',
  alimentation: 'Alimentation',
  soins: 'Soins',
  adaptation: 'Adaptation',
}
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 py-8">
    <NuxtLink to="/" class="text-sm text-gray-500 hover:underline mb-6 inline-block">← Retour à l'accueil</NuxtLink>
    <h1 class="text-2xl font-bold mb-2">Guides d'adoption</h1>
    <p class="text-sm text-gray-500 mb-8">Tout ce qu'il faut savoir avant et après l'adoption.</p>

    <div v-for="(guidesGroupe, thematique) in parThematique" :key="thematique" class="mb-10">
      <h2 class="text-lg font-semibold mb-4">{{ labels[thematique] ?? thematique }}</h2>

      <ul class="space-y-3">
        <li v-for="guide in guidesGroupe" :key="guide.id">
          <NuxtLink
            :to="`/guides/${guide.slug}`"
            class="flex items-center justify-between p-4 rounded-xl border hover:bg-gray-50 transition"
          >
            <p class="font-medium">{{ guide.titre }}</p>
            <span class="text-gray-400 text-sm">→</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </main>
</template>
