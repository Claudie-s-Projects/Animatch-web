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

const ouvert = ref<Record<string, boolean>>({
  critique: true,
  urgent: true,
  prioritaire: true,
})

function toggle(niveau: string) {
  ouvert.value[niveau] = !ouvert.value[niveau]
}
</script>

<template>
  <div class="px-8 pt-6 pb-4">
    <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-sm text-brun-400 hover:text-blush-500 group">
      <span class="inline-block group-hover:-translate-x-1 transition-transform duration-150">‹</span>
      Accueil
    </NuxtLink>
  </div>
  <main class="max-w-6xl mx-auto px-4 pb-8">
    <h1 class="text-2xl font-bold text-brun-800 mb-2">Animaux en longue durée</h1>
    <p class="text-sm text-brun-400 mb-8">Ces animaux attendent une famille depuis plus de 30 jours.</p>

    <div v-for="section in sections" :key="section.niveau" class="mb-4">
      <button
        @click="toggle(section.niveau)"
        class="bg-transparent w-full flex items-center justify-between gap-3 bg-white border border-[#E7CDB6] rounded-xl px-5 py-4 text-left hover:border-blush-500 transition-colors"
      >
        <div class="flex items-center gap-3">
          <h2 class="text-base font-semibold text-brun-800">{{ section.label }}</h2>
          <span
            class="text-xs font-medium px-2 py-0.5 rounded-full"
            :class="{
              'bg-red-100 text-red-600': section.niveau === 'critique',
              'bg-roux-100 text-roux-600': section.niveau === 'urgent',
              'bg-blush-100 text-blush-500': section.niveau === 'prioritaire',
            }"
          >
            {{ section.animaux.length }}
          </span>
        </div>
        <span class="text-brun-400 text-sm transition-transform duration-200" :class="{ 'rotate-180': ouvert[section.niveau] }">▾</span>
      </button>

      <div v-if="ouvert[section.niveau]" class="mt-4">
        <div v-if="section.animaux.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimalCard v-for="animal in section.animaux" :key="animal.id" :animal="animal" />
        </div>
        <p v-else class="text-sm text-brun-400 px-1">Aucun animal dans cette catégorie.</p>
      </div>
    </div>
  </main>
</template>
