<script setup lang="ts">
definePageMeta({ middleware: 'refuge' })

const { public: { apiBase } } = useRuntimeConfig()
const { token } = useAuth()

const refuge = ref<{ nom: string; email: string; adresse: string; localite: string } | null>(null)

const data = await $fetch<{ nom: string; email: string; adresse: string; localite: string }>(`${apiBase}/auth/me-refuge`, {
  headers: { Authorization: `Bearer ${token.value}` },
})
refuge.value = data
</script>

<template>
  <main class="max-w-2xl mx-auto px-4 py-16">
    <h1 class="text-2xl font-bold mb-8">Espace refuge</h1>

    <div v-if="refuge" class="bg-white rounded-xl border p-6 space-y-3">
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide">Nom</p>
        <p class="font-medium">{{ refuge.nom }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide">Email</p>
        <p class="font-medium">{{ refuge.email }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide">Adresse</p>
        <p class="font-medium">{{ refuge.adresse }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide">Localité</p>
        <p class="font-medium">{{ refuge.localite }}</p>
      </div>
    </div>
  </main>
</template>
