<template>
  <div>
    <nav class="border-b px-4 py-3 flex items-center gap-6 bg-white">
      <NuxtLink to="/" class="font-bold text-lg">Animatch</NuxtLink>
      <NuxtLink to="/animals" class="text-sm text-gray-600 hover:text-black">Animaux</NuxtLink>
      <NuxtLink to="/guides" class="text-sm text-gray-600 hover:text-black">Guides</NuxtLink>
      <div class="ml-auto flex gap-3">
        <NuxtLink to="/login" class="text-sm text-gray-600 hover:text-black">Connexion</NuxtLink>
        <NuxtLink to="/register" class="text-sm bg-black text-white px-4 py-1.5 rounded-lg hover:bg-gray-800">S'inscrire</NuxtLink>
      </div>
    </nav>
    <slot />
  </div>
</template>
