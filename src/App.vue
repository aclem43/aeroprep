<script setup lang="ts">
  import { setupListeners } from '@/scripts/listeners'
  import { getCurrentTheme } from './scripts/utils/themes'
  setupListeners()
  const currentTheme = getCurrentTheme()
</script>

<template>
  <v-app :theme="currentTheme">
    <RouterView />
  </v-app>
</template>

<style></style>
