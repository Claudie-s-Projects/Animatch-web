<script setup lang="ts">
import type { Animal } from '~/composables/useAnimals'

defineProps<{ animal: Animal; isFavori?: boolean; showFavori?: boolean }>()
defineEmits<{ toggle: [] }>()
</script>

<template>
  <NuxtLink :to="`/animals/${animal.id}`" class="relative block rounded-xl overflow-hidden shadow hover:shadow-md transition bg-white">
    <button
      v-if="showFavori"
      @click.prevent.stop="$emit('toggle')"
      class="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow text-lg"
      :title="isFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'"
    >
      <span :class="isFavori ? 'text-red-500' : 'text-gray-400'">♥</span>
    </button>

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
