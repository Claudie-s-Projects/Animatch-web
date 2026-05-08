<script setup lang="ts">
const { public: { apiBase } } = useRuntimeConfig()

const form = reactive({
  prenom: '',
  nom: '',
  email: '',
  mot_de_passe: '',
})

const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/auth/register', {
      baseURL: apiBase,
      method: 'POST',
      body: form,
    })
    navigateTo('/')
  } catch (e: any) {
    error.value = e?.data?.message ?? 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="max-w-md mx-auto px-4 py-16">
    <h1 class="text-2xl font-bold mb-8">Créer un compte</h1>

    <form @submit.prevent="submit" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm text-gray-600">Prénom</label>
          <input v-model="form.prenom" required type="text" class="w-full border rounded-lg px-3 py-2 mt-1 text-sm" />
        </div>
        <div>
          <label class="text-sm text-gray-600">Nom</label>
          <input v-model="form.nom" required type="text" class="w-full border rounded-lg px-3 py-2 mt-1 text-sm" />
        </div>
      </div>

      <div>
        <label class="text-sm text-gray-600">Email</label>
        <input v-model="form.email" required type="email" class="w-full border rounded-lg px-3 py-2 mt-1 text-sm" />
      </div>

      <div>
        <label class="text-sm text-gray-600">Mot de passe <span class="text-gray-400">(8 caractères minimum)</span></label>
        <input v-model="form.mot_de_passe" required type="password" minlength="8" class="w-full border rounded-lg px-3 py-2 mt-1 text-sm" />
      </div>

      <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

      <button type="submit" :disabled="loading" class="w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50">
        {{ loading ? 'Création...' : 'Créer mon compte' }}
      </button>
    </form>

    <p class="text-sm text-center text-gray-500 mt-6">
      Déjà un compte ?
      <NuxtLink to="/login" class="underline">Se connecter</NuxtLink>
    </p>
  </main>
</template>
