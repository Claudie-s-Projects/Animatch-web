<script setup lang="ts">
import type { AnimalFilters } from '~/composables/useAnimals'

const emit = defineEmits<{ change: [filters: Omit<AnimalFilters, 'page' | 'limit'>] }>()

const filters = reactive({ espece: '', sexe: '', ville: '' })

function emitChange() {
  emit('change', {
    espece: filters.espece || undefined,
    sexe: filters.sexe || undefined,
    ville: filters.ville || undefined,
  })
}

function reset() {
  filters.espece = ''
  filters.sexe = ''
  filters.ville = ''
  emitChange()
}
</script>

<template>
  <div class="flex flex-wrap gap-3 mb-8">
    <select v-model="filters.espece" @change="emitChange" class="border rounded-lg px-3 py-2 text-sm bg-white">
      <option value="">Toutes les espèces</option>
      <option value="Chien">Chien</option>
      <option value="Chat">Chat</option>
    </select>

    <select v-model="filters.sexe" @change="emitChange" class="border rounded-lg px-3 py-2 text-sm bg-white">
      <option value="">Tous les sexes</option>
      <option value="Mâle">Mâle</option>
      <option value="Femelle">Femelle</option>
    </select>

    <div class="flex gap-2">
      <input
        v-model="filters.ville"
        @keyup.enter="emitChange"
        type="text"
        placeholder="Ville du refuge"
        class="border rounded-lg px-3 py-2 text-sm bg-white"
      />
      <button @click="emitChange" class="px-3 py-2 bg-black text-white text-sm rounded-lg">OK</button>
    </div>

    <button @click="reset" class="px-3 py-2 text-sm text-gray-500 underline">Réinitialiser</button>
  </div>
</template>
