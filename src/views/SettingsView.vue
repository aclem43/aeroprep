<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'
  import { openAlert } from '@/scripts/utils/alert'
  import {
    getWeatherApiKey,
    setTheme,
    setWeatherApiKey,
  } from '@/scripts/settings/settings'
  import { getCurrentTheme } from '@/scripts/utils/themes'
  import { computed, onMounted, ref, watch } from 'vue'
  import AircraftCreationOverlay from '@/components/settings/AircraftCreationOverlay.vue'
  import {
    deleteAircraft,
    getAllAircraft,
    type Aircraft,
  } from '@/scripts/aircraft'

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

  const aircraftList = getAllAircraft()

  const removeAircraft = async (aircraft: Aircraft) => {
    const value = await confirm('Are you sure you want to delete the Aircraft?')
    if (value) {
      await deleteAircraft(aircraft)
      openAlert('Aircraft Deleted', 2000)
    }
  }

  const themeIcon = computed(() => {
    if (theme.value == 'darkTheme') {
      return 'mdi-weather-night'
    } else {
      return 'mdi-weather-sunny'
    }
  })

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
          :prepend-icon="themeIcon"
          label="Theme"
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
        <div class="d-flex text-center settings_chip_gap">
          <div v-for="aircraft in aircraftList" :key="aircraft.name">
            <v-chip
              variant="elevated"
              @click="removeAircraft(aircraft)"
              append-icon="mdi-close-circle"
            >
              {{ aircraft.name }}</v-chip
            >
          </div>
          <v-btn @click="aircraftCreationOverlay.open()">Add Aircraft</v-btn>
        </div>
      </v-card-item>
    </v-card>
  </v-main>
</template>

<style>
  .settings_chip_gap {
    gap: 10px;
    padding: 10px;
  }
</style>
