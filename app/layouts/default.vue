<script setup lang="ts">
const { isLoggedIn, prenom, logout } = useAuth()

function handleLogout() {
  logout()
  navigateTo('/')
}
</script>

<template>
  <div>
    <nav class="border-b px-4 py-3 flex items-center gap-6 bg-white">
      <NuxtLink to="/" class="font-bold text-lg">Animatch</NuxtLink>
      <NuxtLink to="/animals" class="text-sm text-gray-600 hover:text-black">Animaux</NuxtLink>
      <NuxtLink to="/guides" class="text-sm text-gray-600 hover:text-black">Guides</NuxtLink>
      <div class="ml-auto flex gap-3">
        <template v-if="isLoggedIn">
          <span class="text-sm text-gray-500">Bonjour {{ prenom }} !</span>
          <NuxtLink to="/profil" class="text-sm text-gray-600 hover:text-black">Mon profil</NuxtLink>
          <button @click="handleLogout" class="text-sm text-gray-600 hover:text-black">Se déconnecter</button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="text-sm text-gray-600 hover:text-black">Connexion</NuxtLink>
          <NuxtLink to="/register" class="text-sm bg-black text-white px-4 py-1.5 rounded-lg hover:bg-gray-800">S'inscrire</NuxtLink>
        </template>
      </div>
    </nav>
    <slot />
  </div>
</template>
