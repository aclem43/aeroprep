<script setup lang="ts">
  import { setupListeners } from '@/scripts/listeners'
  import { onMounted } from 'vue'
  import { getTheme, setTheme } from './scripts/settings/settings'
  import { getAlert, getAlertRef } from './scripts/utils/alert'
  import { getCurrentTheme } from './scripts/utils/themes'
  setupListeners()
  const currentTheme = getCurrentTheme()

  onMounted(async () => {
    setTheme((await getTheme()) ?? 'darkTheme')
  })
  const alert = getAlert()
  const alertRef = getAlertRef()
</script>

<template>
  <v-app :theme="currentTheme">
    <v-snackbar :timeout="alert.timeout" v-model="alertRef">
      {{ alert.message }}</v-snackbar
    >
    <RouterView />
  </v-app>
</template>

<style></style>
