<script setup lang="ts">
const { isLoggedIn, prenom, nom, role, logout } = useAuth()

const menuOuvert = ref(false)

function handleLogout() {
  logout()
  menuOuvert.value = false
  navigateTo('/')
}
</script>

<template>
  <div>
    <nav class="px-4 py-3 bg-roux-300">
      <div class="flex items-center gap-6">
        <NuxtLink to="/" class="font-bold text-lg text-white">Animatch</NuxtLink>

        <!-- liens desktop -->
        <div class="hidden md:flex items-center gap-6 flex-1">
          <NuxtLink to="/animals" class="text-sm text-roux-100 hover:text-white">Animaux</NuxtLink>
          <NuxtLink to="/guides" class="text-sm text-roux-100 hover:text-white">Guides</NuxtLink>
          <div class="ml-auto flex gap-6 items-center">
            <template v-if="isLoggedIn && role === 'refuge'">
              <span class="text-lg font-semibold text-white">🐾 {{ nom }}</span>
              <NuxtLink to="/espace-refuge" class="text-sm text-roux-100 hover:text-white">Espace refuge</NuxtLink>
              <button @click="handleLogout" class="text-sm text-roux-100 hover:text-white">Se déconnecter</button>
            </template>
            <template v-else-if="isLoggedIn">
              <span class="text-lg font-semibold text-white">🐾 Bonjour {{ prenom }} !</span>
              <NuxtLink to="/favoris" class="text-sm text-roux-100 hover:text-white">Mes favoris</NuxtLink>
              <NuxtLink to="/mes-demandes" class="text-sm text-roux-100 hover:text-white">Mes demandes</NuxtLink>
              <NuxtLink to="/profil" class="text-sm text-roux-100 hover:text-white">Mon profil</NuxtLink>
              <button @click="handleLogout" class="text-sm text-roux-100 hover:text-white">Se déconnecter</button>
            </template>
            <template v-else>
              <NuxtLink to="/login" class="text-sm text-roux-100 hover:text-white">Connexion</NuxtLink>
              <NuxtLink to="/register" class="text-sm bg-white text-roux-600 px-4 py-1.5 rounded-lg hover:bg-creme-50 font-medium">S'inscrire</NuxtLink>
            </template>
          </div>
        </div>

        <!-- bouton hamburger mobile -->
        <button @click="menuOuvert = !menuOuvert" class="md:hidden ml-auto text-white text-2xl">
          {{ menuOuvert ? '✕' : '☰' }}
        </button>
      </div>

      <!-- menu mobile -->
      <div v-if="menuOuvert" class="md:hidden flex flex-col gap-3 pt-3 border-t border-roux-100/30 mt-3">
        <NuxtLink to="/animals" @click="menuOuvert = false" class="text-sm text-roux-100 hover:text-white">Animaux</NuxtLink>
        <NuxtLink to="/guides" @click="menuOuvert = false" class="text-sm text-roux-100 hover:text-white">Guides</NuxtLink>
        <template v-if="isLoggedIn && role === 'refuge'">
          <span class="text-sm font-semibold text-white">🐾 {{ nom }}</span>
          <NuxtLink to="/espace-refuge" @click="menuOuvert = false" class="text-sm text-roux-100 hover:text-white">Espace refuge</NuxtLink>
          <button @click="handleLogout" class="text-sm text-roux-100 hover:text-white text-left">Se déconnecter</button>
        </template>
        <template v-else-if="isLoggedIn">
          <span class="text-sm font-semibold text-white">🐾 Bonjour {{ prenom }} !</span>
          <NuxtLink to="/favoris" @click="menuOuvert = false" class="text-sm text-roux-100 hover:text-white">Mes favoris</NuxtLink>
          <NuxtLink to="/mes-demandes" @click="menuOuvert = false" class="text-sm text-roux-100 hover:text-white">Mes demandes</NuxtLink>
          <NuxtLink to="/profil" @click="menuOuvert = false" class="text-sm text-roux-100 hover:text-white">Mon profil</NuxtLink>
          <button @click="handleLogout" class="text-sm text-roux-100 hover:text-white text-left">Se déconnecter</button>
        </template>
        <template v-else>
          <NuxtLink to="/login" @click="menuOuvert = false" class="text-sm text-roux-100 hover:text-white">Connexion</NuxtLink>
          <NuxtLink to="/register" @click="menuOuvert = false" class="text-sm bg-white text-roux-600 px-4 py-1.5 rounded-lg hover:bg-creme-50 font-medium w-fit">S'inscrire</NuxtLink>
        </template>
      </div>
    </nav>
    <slot />
  </div>
</template>
