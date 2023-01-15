<script setup lang="ts">
  import { setupListeners } from '@/scripts/listeners'
  import { onMounted } from 'vue'
  import { getAllAircraft, initAircraft } from './scripts/aircraft'
  import { getAlert, getAlertRef } from './scripts/utils/alert'
  import { getCurrentTheme, initalizeTheme } from './scripts/utils/themes'
  setupListeners()
  const currentTheme = getCurrentTheme()

  onMounted(async () => {
    await initalizeTheme()
  })
  const alert = getAlert()
  const alertRef = getAlertRef()

  onMounted(async () => {
    const aircraft = getAllAircraft()
    aircraft.value = await initAircraft()
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
