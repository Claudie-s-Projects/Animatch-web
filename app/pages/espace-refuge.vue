<script setup lang="ts">
const { isLoggedIn } = useAuth()

if (!isLoggedIn.value) {
  navigateTo('/login')
}
</script>

<template>
  <main class="max-w-2xl mx-auto px-4 py-16">
    <h1 class="text-2xl font-bold mb-4">Espace refuge</h1>
    <p class="text-gray-500">Bienvenue dans votre espace refuge.</p>
  </main>
</template>
