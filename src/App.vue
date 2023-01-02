<script setup lang="ts">
  import { setupListeners } from '@/scripts/listeners'
  setupListeners()
</script>

<template>
  <v-app theme="">
    <RouterView />
  </v-app>
</template>

<style></style>
