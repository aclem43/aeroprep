<script setup lang="ts">
  import { setupListeners } from '@/scripts/listeners'
  import { onMounted } from 'vue'
  import { getTheme, setTheme } from './scripts/settings/settings'
  import { getCurrentTheme } from './scripts/utils/themes'
  setupListeners()
  const currentTheme = getCurrentTheme()

  onMounted(async () => {
    setTheme((await getTheme()) ?? 'darkTheme')
  })
</script>

<template>
  <v-app :theme="currentTheme">
    <RouterView />
  </v-app>
</template>

<style></style>
