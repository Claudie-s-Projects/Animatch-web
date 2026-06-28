<script setup lang="ts">
useHead({
  htmlAttrs: { lang: "fr" },
  title: "Animatch",
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
