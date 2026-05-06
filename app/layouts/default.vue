<template>
  <div>
    <nav class="border-b px-4 py-3 flex items-center gap-6 bg-white">
      <NuxtLink to="/" class="font-bold text-lg">Animatch</NuxtLink>
      <NuxtLink to="/animals" class="text-sm text-gray-600 hover:text-black">Animaux</NuxtLink>
      <NuxtLink to="/guides" class="text-sm text-gray-600 hover:text-black">Guides</NuxtLink>
    </nav>
    <slot />
  </div>
</template>
