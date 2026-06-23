<script setup lang="ts">
import type { AnimalFilters, AnimalsResponse } from "~/composables/useAnimals";

const {
  public: { apiBase },
} = useRuntimeConfig();
const { isLoggedIn } = useAuth();
const { fetchFavoris, addFavori, removeFavori } = useFavoris();

const filters = reactive<AnimalFilters>({ page: 1, limit: 20 });

const favorisIds = ref<Set<number>>(new Set());

if (isLoggedIn.value) {
  const favoris = await fetchFavoris();
  favorisIds.value = new Set(favoris.map((f) => f.animal.id));
}

async function toggleFavori(animalId: number) {
  if (favorisIds.value.has(animalId)) {
    await removeFavori(animalId);
    favorisIds.value.delete(animalId);
  } else {
    await addFavori(animalId);
    favorisIds.value.add(animalId);
  }
  favorisIds.value = new Set(favorisIds.value);
}

const { data, status } = await useFetch<AnimalsResponse>("/animals", {
  baseURL: apiBase,
  query: filters,
});

function applyFilters(newFilters: Omit<AnimalFilters, "page" | "limit">) {
  Object.assign(filters, newFilters, { page: 1 });
}

function goTo(p: number) {
  filters.page = p;
}

const totalPages = computed(() =>
  data.value ? Math.ceil(data.value.total / filters.limit!) : 0,
);
</script>

<template>
  <div class="px-8 pt-6 pb-4">
    <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-sm text-brun-400 hover:text-blush-500 group">
      <span class="inline-block group-hover:-translate-x-1 transition-transform duration-150">‹</span>
      Accueil
    </NuxtLink>
  </div>
  <main class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6 text-brun-800">Animaux disponibles</h1>

    <AnimalFilters @change="applyFilters" />

    <div v-if="status === 'pending'" class="text-center py-12 text-brun-400">
      Chargement...
    </div>

    <div v-else-if="data">
      <p class="text-sm text-brun-400 mb-4">
        {{ data.total }} animal(aux) trouvé(s)
      </p>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimalCard
          v-for="animal in data.data"
          :key="animal.id"
          :animal="animal"
          :show-favori="isLoggedIn"
          :is-favori="favorisIds.has(animal.id)"
          @toggle="toggleFavori(animal.id)"
        />
      </div>

      <div
        v-if="totalPages > 1"
        class="flex justify-center items-center gap-2 mt-10"
      >
        <button
          v-for="p in totalPages"
          :key="p"
          @click="goTo(p)"
          :class="[
            'px-3 py-1 rounded-lg text-sm transition-colors',
            p === filters.page
              ? 'bg-blush-500 text-white'
              : 'bg-white border border-[#E7CDB6] text-brun-700 hover:bg-creme-50',
          ]"
        >
          {{ p }}
        </button>
      </div>
    </div>
  </main>
</template>
