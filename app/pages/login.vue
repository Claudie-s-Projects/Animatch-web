<script setup lang="ts">
const { login, loginRefuge } = useAuth()

const type = ref<'famille' | 'refuge'>('famille')
const email = ref('')
const motDePasse = ref('')
const error = ref('')

async function submit() {
  error.value = ''
  try {
    if (type.value === 'refuge') {
      await loginRefuge(email.value, motDePasse.value)
      navigateTo('/espace-refuge')
    } else {
      await login(email.value, motDePasse.value)
      navigateTo('/')
    }
  } catch {
    error.value = 'Email ou mot de passe incorrect.'
  }
}
</script>

<template>
  <div class="max-w-sm mx-auto mt-16 px-4">
    <div class="bg-white rounded-[20px] shadow-md overflow-hidden">
      <div class="bg-linear-to-r from-blush-500 to-roux-600 px-8 py-6">
        <h1 class="text-2xl font-bold text-white">Connexion</h1>
      </div>

      <div class="px-8 py-6">
        <div class="flex rounded-lg border border-[#E7CDB6] overflow-hidden mb-6 text-sm">
          <button
            @click="type = 'famille'"
            :class="type === 'famille' ? 'bg-blush-500 text-white' : 'text-brun-400 hover:bg-creme-50'"
            class="flex-1 py-2 transition-colors"
          >
            Famille
          </button>
          <button
            @click="type = 'refuge'"
            :class="type === 'refuge' ? 'bg-roux-600 text-white' : 'text-brun-400 hover:bg-creme-50'"
            class="flex-1 py-2 transition-colors"
          >
            Refuge
          </button>
        </div>

        <form @submit.prevent="submit" class="flex flex-col gap-4">
          <input v-model="email" type="email" placeholder="Email" required
            class="bg-creme-50 border border-[#E7CDB6] rounded-lg px-4 py-2 text-sm text-brun-800 focus:outline-none focus:border-blush-500 focus:ring-2 focus:ring-blush-100" />
          <input v-model="motDePasse" type="password" placeholder="Mot de passe" required
            class="bg-creme-50 border border-[#E7CDB6] rounded-lg px-4 py-2 text-sm text-brun-800 focus:outline-none focus:border-blush-500 focus:ring-2 focus:ring-blush-100" />
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
          <button type="submit"
            class="bg-blush-500 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blush-400 transition-colors">
            Se connecter
          </button>
        </form>

        <p class="mt-4 text-sm text-brun-400">
          Pas encore de compte ?
          <NuxtLink to="/register" class="text-brun-700 underline hover:text-blush-500">S'inscrire</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
