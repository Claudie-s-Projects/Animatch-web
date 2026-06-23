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
    <nav class="px-4 py-3 shadow-sm overflow-visible relative z-50" style="background-color: rgba(201, 106, 30, 0.6);">
      <div class="flex items-center gap-6">
        <NuxtLink to="/" class="flex items-center gap-2 font-bold text-lg text-brun-800">
          <img src="/logo.png" alt="Animatch" class="h-10 w-10 object-contain mix-blend-multiply" />
          Animatch
        </NuxtLink>

        <!-- liens desktop -->
        <div class="hidden md:flex items-center gap-6 flex-1">
          <div class="relative group">
            <!-- pb-2 étend la zone hover du bouton jusqu'au panel, sans gap visible -->
            <button class="text-sm text-brun-700 hover:text-blush-500 flex items-center gap-1">
              Animaux <span class="text-xs">▾</span>
            </button>
            <div class="absolute top-full left-0 min-w-[160px] hidden group-hover:block z-50">
              <div class="bg-white rounded-xl shadow-md py-2">
                <NuxtLink to="/animals" class="block px-4 py-2 text-sm text-brun-700 hover:text-blush-500">Tous les animaux</NuxtLink>
                <NuxtLink to="/longue-duree" class="block px-4 py-2 text-sm text-brun-700 hover:text-blush-500">Pensionnaires de longue durée</NuxtLink>
              </div>
            </div>
          </div>
          <NuxtLink to="/guides" class="text-sm text-brun-700 hover:text-blush-500">Guides</NuxtLink>
          <div class="ml-auto flex gap-6 items-center">
            <template v-if="isLoggedIn && role === 'refuge'">
              <NuxtLink to="/espace-refuge" class="text-sm text-brun-700 hover:text-blush-500">Espace refuge</NuxtLink>
              <div class="relative group">
                <button class="w-9 h-9 rounded-full bg-roux-600 text-white text-sm font-semibold flex items-center justify-center">
                  {{ nom?.charAt(0).toUpperCase() }}
                </button>
                <div class="absolute top-full right-0 min-w-[160px] hidden group-hover:block z-50">
                  <div class="bg-white rounded-xl shadow-md py-2">
                    <span class="block px-4 py-2 text-xs text-brun-400 font-medium">{{ nom }}</span>
                    <hr class="border-[#E7CDB6] my-1" />
                    <button @click="handleLogout" class="block w-full bg-transparent text-left px-4 py-2 text-sm text-brun-700 hover:text-blush-500">Se déconnecter</button>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="isLoggedIn">
              <div class="relative group">
                <button class="w-9 h-9 rounded-full bg-blush-500 text-white text-sm font-semibold flex items-center justify-center">
                  {{ prenom?.charAt(0).toUpperCase() }}
                </button>
                <div class="absolute top-full right-0 min-w-[180px] hidden group-hover:block z-50">
                  <div class="bg-white rounded-xl shadow-md py-2">
                    <span class="block px-4 py-2 text-xs text-brun-400 font-medium">{{ prenom }}</span>
                    <hr class="border-[#E7CDB6] my-1" />
                    <NuxtLink to="/favoris" class="block px-4 py-2 text-sm text-brun-700 hover:text-blush-500">♥ Favoris</NuxtLink>
                    <NuxtLink to="/mes-demandes" class="block px-4 py-2 text-sm text-brun-700 hover:text-blush-500">Mes demandes</NuxtLink>
                    <div class="group/tip relative">
                      <NuxtLink to="/profil" class="flex items-center justify-between px-4 py-2 text-sm text-brun-700 hover:text-blush-500">
                        Mon profil
                        <span class="text-[10px] text-brun-400 border border-[#E7CDB6] rounded-full w-4 h-4 flex items-center justify-center shrink-0 ml-2">i</span>
                      </NuxtLink>
                      <div class="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-52 text-xs bg-brun-800 text-creme-50 p-3 rounded-xl hidden group-hover/tip:block z-50 leading-relaxed">
                        Complète ton profil à 100% pour accéder au matching avec les animaux.
                      </div>
                    </div>
                    <hr class="border-[#E7CDB6] my-1" />
                    <button @click="handleLogout" class="block w-full bg-transparent text-left px-4 py-2 text-sm text-brun-700 hover:text-blush-500">Se déconnecter</button>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <NuxtLink to="/login" class="text-sm text-brun-700 hover:text-blush-500">Connexion</NuxtLink>
              <NuxtLink to="/register" class="text-sm bg-blush-500 text-white px-4 py-1.5 rounded-lg hover:bg-blush-400 font-medium">S'inscrire</NuxtLink>
            </template>
          </div>
        </div>

        <!-- bouton hamburger mobile -->
        <button @click="menuOuvert = !menuOuvert" class="md:hidden ml-auto text-brun-700 text-2xl">
          {{ menuOuvert ? '✕' : '☰' }}
        </button>
      </div>

      <!-- menu mobile -->
      <div v-if="menuOuvert" class="md:hidden flex flex-col gap-3 pt-3 border-t border-creme-50 mt-3">
        <NuxtLink to="/animals" @click="menuOuvert = false" class="text-sm text-brun-700 hover:text-blush-500">Animaux</NuxtLink>
        <NuxtLink to="/guides" @click="menuOuvert = false" class="text-sm text-brun-700 hover:text-blush-500">Guides</NuxtLink>
        <template v-if="isLoggedIn && role === 'refuge'">
          <span class="text-sm font-semibold text-brun-800">🐾 {{ nom }}</span>
          <NuxtLink to="/espace-refuge" @click="menuOuvert = false" class="text-sm text-brun-700 hover:text-blush-500">Espace refuge</NuxtLink>
          <button @click="handleLogout" class="text-sm text-brun-700 hover:text-blush-500 text-left">Se déconnecter</button>
        </template>
        <template v-else-if="isLoggedIn">
          <span class="text-sm font-semibold text-brun-800">🐾 Bonjour {{ prenom }} !</span>
          <NuxtLink to="/favoris" @click="menuOuvert = false" class="text-sm text-brun-700 hover:text-blush-500">♥ Favoris</NuxtLink>
          <NuxtLink to="/mes-demandes" @click="menuOuvert = false" class="text-sm text-brun-700 hover:text-blush-500">Mes demandes</NuxtLink>
          <NuxtLink to="/profil" @click="menuOuvert = false" class="text-sm text-brun-700 hover:text-blush-500">Mon profil</NuxtLink>
          <button @click="handleLogout" class="text-sm text-brun-700 hover:text-blush-500 text-left">Se déconnecter</button>
        </template>
        <template v-else>
          <NuxtLink to="/login" @click="menuOuvert = false" class="text-sm text-brun-700 hover:text-blush-500">Connexion</NuxtLink>
          <NuxtLink to="/register" @click="menuOuvert = false" class="text-sm bg-blush-500 text-white px-4 py-1.5 rounded-lg hover:bg-blush-400 font-medium w-fit">S'inscrire</NuxtLink>
        </template>
      </div>
    </nav>
    <slot />
  </div>
</template>
