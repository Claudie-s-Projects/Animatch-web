<script setup lang="ts">
const route = useRoute()
const { fetchGuide } = useGuides()

const { data: guide } = await fetchGuide(route.params.slug as string)

if (!guide.value) {
  throw createError({ statusCode: 404, message: 'Guide introuvable' })
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

    <div v-if="guide">
      <div class="flex items-center gap-3 mb-6">
        <h1 class="text-2xl font-bold text-brun-800">{{ guide.titre }}</h1>
        <span v-if="guide.espece" class="text-xs bg-creme-50 text-brun-700 border border-[#E7CDB6] px-2 py-1 rounded-full">
          {{ guide.espece }}
        </span>
      </div>

      <div class="bg-white rounded-[20px] border border-[#E7CDB6] p-6 shadow-sm text-brun-700 whitespace-pre-line leading-relaxed text-sm">
        {{ guide.contenu }}
      </div>
    </div>
  </main>
</template>
