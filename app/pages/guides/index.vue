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

const thematiqueConfig: Record<string, { label: string; border: string; badge: string; emoji: string }> = {
  preparation: {
    label: 'Préparer l\'arrivée',
    border: 'border-l-roux-600',
    badge: 'bg-roux-100 text-roux-600',
    emoji: '🏠',
  },
  alimentation: {
    label: 'Alimentation',
    border: 'border-l-blush-500',
    badge: 'bg-blush-100 text-blush-500',
    emoji: '🥣',
  },
  soins: {
    label: 'Soins',
    border: 'border-l-brun-400',
    badge: 'bg-creme-50 text-brun-700',
    emoji: '🩺',
  },
  adaptation: {
    label: 'Adaptation',
    border: 'border-l-brun-700',
    badge: 'bg-creme-50 text-brun-800',
    emoji: '🌱',
  },
}
</script>

<template>
  <div class="px-8 pt-6 pb-4">
    <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-sm text-brun-400 hover:text-blush-500 group">
      <span class="inline-block group-hover:-translate-x-1 transition-transform duration-150">‹</span>
      Accueil
    </NuxtLink>
  </div>
  <main class="max-w-3xl mx-auto px-4 pb-8">
    <h1 class="text-2xl font-bold text-brun-800 mb-1">Guides d'adoption</h1>
    <p class="text-sm text-brun-400 mb-10">Tout ce qu'il faut savoir avant et après l'adoption.</p>

    <div v-for="(guidesGroupe, thematique) in parThematique" :key="thematique" class="mb-10">
      <!-- En-tête de section -->
      <div class="flex items-center gap-3 mb-5">
        <span class="text-2xl leading-none">{{ thematiqueConfig[thematique]?.emoji ?? '📄' }}</span>
        <h2 class="text-sm font-semibold uppercase tracking-widest text-brun-400">
          {{ thematiqueConfig[thematique]?.label ?? thematique }}
        </h2>
      </div>

      <!-- Grille 2 colonnes -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <NuxtLink
          v-for="guide in guidesGroupe"
          :key="guide.id"
          :to="`/guides/${guide.slug}`"
          class="border-l-4 pl-4 py-3 group"
          :class="thematiqueConfig[thematique]?.border ?? 'border-l-brun-400'"
        >
          <p class="font-medium text-brun-800 group-hover:text-blush-500 group-hover:underline leading-snug">
            {{ guide.titre }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
