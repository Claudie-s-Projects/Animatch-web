<script setup lang="ts">
const { public: { apiBase } } = useRuntimeConfig()
const { token } = useAuth()

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
    const data = await $fetch<{ access_token: string }>('/auth/register', {
      baseURL: apiBase,
      method: 'POST',
      body: form,
    })
    token.value = data.access_token
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
    <div class="bg-white rounded-[20px] shadow-md overflow-hidden">
      <div class="bg-linear-to-r from-blush-500 to-roux-600 px-8 py-6">
        <h1 class="text-2xl font-bold text-white">Créer un compte</h1>
      </div>

      <div class="px-8 py-6">
        <form @submit.prevent="submit" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm text-brun-700">Prénom</label>
              <input v-model="form.prenom" required type="text"
                class="w-full bg-creme-50 border border-[#E7CDB6] rounded-lg px-3 py-2 mt-1 text-sm text-brun-800 focus:outline-none focus:border-blush-500 focus:ring-2 focus:ring-blush-100" />
            </div>
            <div>
              <label class="text-sm text-brun-700">Nom</label>
              <input v-model="form.nom" required type="text"
                class="w-full bg-creme-50 border border-[#E7CDB6] rounded-lg px-3 py-2 mt-1 text-sm text-brun-800 focus:outline-none focus:border-blush-500 focus:ring-2 focus:ring-blush-100" />
            </div>
          </div>

          <div>
            <label class="text-sm text-brun-700">Email</label>
            <input v-model="form.email" required type="email"
              class="w-full bg-creme-50 border border-[#E7CDB6] rounded-lg px-3 py-2 mt-1 text-sm text-brun-800 focus:outline-none focus:border-blush-500 focus:ring-2 focus:ring-blush-100" />
          </div>

          <div>
            <label class="text-sm text-brun-700">Mot de passe <span class="text-brun-400">(8 caractères minimum)</span></label>
            <input v-model="form.mot_de_passe" required type="password" minlength="8"
              class="w-full bg-creme-50 border border-[#E7CDB6] rounded-lg px-3 py-2 mt-1 text-sm text-brun-800 focus:outline-none focus:border-blush-500 focus:ring-2 focus:ring-blush-100" />
          </div>

          <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

          <button type="submit" :disabled="loading"
            class="w-full bg-blush-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blush-400 transition-colors disabled:opacity-50">
            {{ loading ? 'Création...' : 'Créer mon compte' }}
          </button>
        </form>

        <p class="text-sm text-center text-brun-400 mt-6">
          Déjà un compte ?
          <NuxtLink to="/login" class="text-brun-700 underline hover:text-blush-500">Se connecter</NuxtLink>
        </p>

        <p class="text-sm text-center text-brun-400 mt-2">
          Vous êtes un refuge ?
          <NuxtLink to="/register-refuge" class="text-brun-700 underline hover:text-blush-500">Créer un espace refuge</NuxtLink>
        </p>
      </div>
    </div>
  </main>
</template>
