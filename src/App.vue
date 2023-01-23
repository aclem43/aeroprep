<script setup lang="ts">
  import { setupListeners } from '@/scripts/listeners'
  import { onMounted } from 'vue'
  import { initialize } from './scripts/initialize'
  import { getAlert, getAlertRef } from './scripts/utils/alert'
  import { getCurrentTheme } from './scripts/utils/themes'
  import { SplashScreen } from '@capacitor/splash-screen'
  setupListeners()
  const currentTheme = getCurrentTheme()

  const alert = getAlert()
  const alertRef = getAlertRef()

  onMounted(async () => {
    initialize()
    await SplashScreen.hide()
  })
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
