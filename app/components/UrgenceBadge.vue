<script setup lang="ts">
defineProps<{ urgence: 'prioritaire' | 'urgent' | 'critique' | null }>()

const styles = {
  prioritaire: 'bg-yellow-100 text-yellow-800',
  urgent: 'bg-orange-100 text-orange-800',
  critique: 'bg-red-100 text-red-800',
}
</script>

<template>
  <span v-if="urgence" :class="['text-xs font-medium px-2 py-1 rounded-full', styles[urgence]]">
    {{ urgence }}
  </span>
</template>
