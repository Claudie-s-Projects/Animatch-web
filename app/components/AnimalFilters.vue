<script setup lang="ts">
import type { AnimalFilters } from '~/composables/useAnimals'

const emit = defineEmits<{ change: [filters: Omit<AnimalFilters, 'page' | 'limit'>] }>()

const filters = reactive({ espece: '', sexe: '', ville: '', urgence: '' })

function emitChange() {
  emit('change', {
    espece: filters.espece || undefined,
    sexe: filters.sexe || undefined,
    ville: filters.ville || undefined,
    urgence: (filters.urgence || undefined) as AnimalFilters['urgence'],
  })
}

function reset() {
  filters.espece = ''
  filters.sexe = ''
  filters.ville = ''
  filters.urgence = ''
  emitChange()
}
</script>

<template>
  <div class="flex flex-wrap gap-3 mb-8">
    <select v-model="filters.espece" @change="emitChange"
      class="bg-creme-50 border border-[#E7CDB6] rounded-lg px-3 py-2 text-sm text-brun-700 focus:outline-none focus:border-blush-500">
      <option value="">Toutes les espèces</option>
      <option value="Chien">Chien</option>
      <option value="Chat">Chat</option>
    </select>

    <select v-model="filters.sexe" @change="emitChange"
      class="bg-creme-50 border border-[#E7CDB6] rounded-lg px-3 py-2 text-sm text-brun-700 focus:outline-none focus:border-blush-500">
      <option value="">Tous les sexes</option>
      <option value="Mâle">Mâle</option>
      <option value="Femelle">Femelle</option>
    </select>

    <select v-model="filters.urgence" @change="emitChange"
      class="bg-creme-50 border border-[#E7CDB6] rounded-lg px-3 py-2 text-sm text-brun-700 focus:outline-none focus:border-blush-500">
      <option value="">Toutes les urgences</option>
      <option value="prioritaire">Prioritaire</option>
      <option value="urgent">Urgent</option>
      <option value="critique">Critique</option>
    </select>

    <div class="flex gap-2">
      <input
        v-model="filters.ville"
        @keyup.enter="emitChange"
        type="text"
        placeholder="Ville du refuge"
        class="bg-creme-50 border border-[#E7CDB6] rounded-lg px-3 py-2 text-sm text-brun-700 focus:outline-none focus:border-blush-500 focus:ring-2 focus:ring-blush-100"
      />
      <button @click="emitChange" class="px-3 py-2 bg-blush-500 text-white text-sm rounded-lg hover:bg-blush-400 transition-colors">OK</button>
    </div>

    <button @click="reset" class="px-3 py-2 text-sm text-brun-400 underline hover:text-blush-500">Réinitialiser</button>
  </div>
</template>
