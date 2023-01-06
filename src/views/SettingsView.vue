<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'
  import { openAlert } from '@/scripts/utils/alert'
  import {
    getWeatherApiKey,
    setTheme,
    setWeatherApiKey,
  } from '@/scripts/settings/settings'
  import { getCurrentTheme } from '@/scripts/utils/themes'
  import { onMounted, ref, watch } from 'vue'
  import AircraftCreationOverlay from '@/components/settings/AircraftCreationOverlay.vue'

  const weatherApiKey = ref()

  const saveWeatherApiKey = async () => {
    await setWeatherApiKey(weatherApiKey.value)
    openAlert('Api Key Saved', 2000)
  }

  onMounted(async () => {
    weatherApiKey.value = await getWeatherApiKey()
  })

  const theme = getCurrentTheme()

  const aircraftCreationOverlay = ref()

  watch(theme, async () => {
    await setTheme(theme.value)
  })
</script>

<template>
  <AppBar />
  <v-main>
    <AircraftCreationOverlay
      ref="aircraftCreationOverlay"
    ></AircraftCreationOverlay>
    <v-card>
      <v-card-title> Settings </v-card-title>
      <v-card-item>
        <v-switch
          true-value="darkTheme"
          false-value="lightTheme"
          :label="`Theme: ${theme}`"
          v-model="theme"
        ></v-switch>
        <div class="d-flex">
          <v-text-field
            label="Weather Api Key"
            variant="underlined"
            v-model="weatherApiKey"
          ></v-text-field>
          <v-btn prepend-icon="mdi-content-save" @click="saveWeatherApiKey()">
            Save
          </v-btn>
        </div>
        <div>
          <v-btn @click="aircraftCreationOverlay.open">Add Aircraft</v-btn>
        </div>
      </v-card-item>
    </v-card>
  </v-main>
</template>
