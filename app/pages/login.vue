<script setup lang="ts">
const { login } = useAuth()

const email = ref('')
const motDePasse = ref('')
const error = ref('')

async function submit() {
  error.value = ''
  try {
    await login(email.value, motDePasse.value)
    navigateTo('/')
  } catch {
    error.value = 'Email ou mot de passe incorrect.'
  }
}
</script>

<template>
  <div class="max-w-sm mx-auto mt-16 px-4">
    <h1 class="text-2xl font-bold mb-6">Connexion</h1>
    <form @submit.prevent="submit" class="flex flex-col gap-4">
      <input v-model="email" type="email" placeholder="Email" required
        class="border rounded-lg px-4 py-2 text-sm" />
      <input v-model="motDePasse" type="password" placeholder="Mot de passe" required
        class="border rounded-lg px-4 py-2 text-sm" />
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      <button type="submit"
        class="bg-black text-white rounded-lg px-4 py-2 text-sm hover:bg-gray-800">
        Se connecter
      </button>
    </form>
    <p class="mt-4 text-sm text-gray-500">
      Pas encore de compte ?
      <NuxtLink to="/register" class="underline">S'inscrire</NuxtLink>
    </p>
  </div>
</template>
