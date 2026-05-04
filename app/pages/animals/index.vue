<script setup lang="ts">
const { fetchAnimals } = useAnimals()

const page = ref(1)
const limit = 20

const { data, status } = await fetchAnimals({ page: page.value, limit })

async function goTo(p: number) {
  page.value = p
  const result = await fetchAnimals({ page: p, limit })
  if (result.data.value) {
    data.value = result.data.value
  }
}

const totalPages = computed(() => data.value ? Math.ceil(data.value.total / limit) : 0)
</script>

<template>
  <main class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Animaux disponibles</h1>

    <div v-if="status === 'pending'" class="text-center py-12 text-gray-400">Chargement...</div>

    <div v-else-if="data">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimalCard v-for="animal in data.data" :key="animal.id" :animal="animal" />
      </div>

      <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-10">
        <button
          v-for="p in totalPages"
          :key="p"
          @click="goTo(p)"
          :class="[
            'px-3 py-1 rounded text-sm',
            p === page ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          ]"
        >
          {{ p }}
        </button>
      </div>
    </div>
  </main>
</template>
