<script setup lang="ts">
import type { Animal } from "~/composables/useAnimals";

defineProps<{ animal: Animal; isFavori?: boolean; showFavori?: boolean }>();
defineEmits<{ toggle: [] }>();
</script>

<template>
  <NuxtLink
    :to="`/animals/${animal.id}`"
    class="relative block rounded-[20px] overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white"
  >
    <button
      v-if="showFavori"
      @click.prevent.stop="$emit('toggle')"
      class="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow text-lg"
      :title="isFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'"
    >
      <span :class="isFavori ? 'text-red-500' : 'text-brun-400'">♥</span>
    </button>

    <div v-if="animal.photo_url" class="relative">
      <img
        :src="animal.photo_url"
        :alt="animal.nom"
        class="w-full h-48 object-cover"
      />
      <div
        class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none"
      ></div>
    </div>
    <div
      v-else
      class="w-full h-48 bg-creme-50 flex items-center justify-center text-brun-400 text-sm"
    >
      Pas de photo
    </div>

    <div class="p-4 space-y-1">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-lg">{{ animal.nom }}</h2>
        <UrgenceBadge :urgence="animal.urgence" />
      </div>
      <p class="text-sm text-brun-700">
        {{ animal.espece }} · {{ animal.race }}
      </p>
      <p class="text-sm text-brun-700">{{ animal.age }}</p>
      <p v-if="animal.refuge" class="text-xs text-brun-400">
        {{ animal.refuge.nom }} — {{ animal.refuge.ville }}
      </p>
    </div>
  </NuxtLink>
</template>
