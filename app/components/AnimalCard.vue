<script setup lang="ts">
import type { Animal } from '~/composables/useAnimals'

defineProps<{ animal: Animal }>()
</script>

<template>
  <NuxtLink :to="`/animals/${animal.id}`" class="block rounded-xl overflow-hidden shadow hover:shadow-md transition bg-white">
    <img
      v-if="animal.photo_url"
      :src="animal.photo_url"
      :alt="animal.nom"
      class="w-full h-48 object-cover"
    />
    <div v-else class="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
      Pas de photo
    </div>

    <div class="p-4 space-y-1">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-lg">{{ animal.nom }}</h2>
        <UrgenceBadge :urgence="animal.urgence" />
      </div>
      <p class="text-sm text-gray-500">{{ animal.espece }} · {{ animal.race }}</p>
      <p class="text-sm text-gray-500">{{ animal.age }}</p>
      <p v-if="animal.refuge" class="text-xs text-gray-400">{{ animal.refuge.nom }} — {{ animal.refuge.ville }}</p>
    </div>
  </NuxtLink>
</template>
