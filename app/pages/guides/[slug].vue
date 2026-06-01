<script setup lang="ts">
const route = useRoute()
const { fetchGuide } = useGuides()

const { data: guide } = await fetchGuide(route.params.slug as string)

if (!guide.value) {
  throw createError({ statusCode: 404, message: 'Guide introuvable' })
}
</script>

<template>
  <main class="max-w-2xl mx-auto px-4 py-8">
    <NuxtLink to="/guides" class="text-sm text-gray-500 hover:underline mb-6 inline-block">
      ← Retour aux guides
    </NuxtLink>

    <div v-if="guide">
      <div class="flex items-center gap-3 mb-6">
        <h1 class="text-2xl font-bold">{{ guide.titre }}</h1>
        <span v-if="guide.espece" class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {{ guide.espece }}
        </span>
      </div>

      <div class="prose text-gray-700 whitespace-pre-line leading-relaxed">
        {{ guide.contenu }}
      </div>
    </div>
  </main>
</template>
