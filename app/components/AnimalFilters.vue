<script setup lang="ts">
import type { AnimalFilters } from '~/composables/useAnimals'

const emit = defineEmits<{ change: [filters: Omit<AnimalFilters, 'page' | 'limit'>] }>()

const espece = ref('')
const sexe = ref('')
const ville = ref('')

function emitChange() {
  emit('change', {
    espece: espece.value || undefined,
    sexe: sexe.value || undefined,
    ville: ville.value || undefined,
  })
}

function reset() {
  espece.value = ''
  sexe.value = ''
  ville.value = ''
  emitChange()
}
</script>

<template>
  <div class="flex flex-wrap gap-3 mb-8">
    <select v-model="espece" @change="emitChange" class="border rounded-lg px-3 py-2 text-sm bg-white">
      <option value="">Toutes les espèces</option>
      <option value="Chien">Chien</option>
      <option value="Chat">Chat</option>
    </select>

    <select v-model="sexe" @change="emitChange" class="border rounded-lg px-3 py-2 text-sm bg-white">
      <option value="">Tous les sexes</option>
      <option value="Mâle">Mâle</option>
      <option value="Femelle">Femelle</option>
    </select>

    <div class="flex gap-2">
      <input
        v-model="ville"
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
