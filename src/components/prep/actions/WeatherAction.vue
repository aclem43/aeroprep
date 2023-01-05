<script setup lang="ts">
  // Basics Done
  import { setApiKey, getWeather } from '@/scripts/prep/weatheraction'
  import { onMounted, ref, type Ref } from 'vue'
  import type { Weather } from '@/models/WeatherModels'
  import { getWeatherApiKey } from '@/scripts/settings/settings'

  const airport = ref()
  const nearest = ref()

  const weather: Ref<Weather | null> = ref(null)
  const showCard = ref(false)
  const loading = ref(false)

  const get = async () => {
    if (airport.value == undefined || airport.value == null) {
      return
    }
    showCard.value = true
    loading.value = true
    weather.value = null

    weather.value = await getWeather(airport.value, nearest.value)
    loading.value = false
  }
  onMounted(async () => {
    setApiKey((await getWeatherApiKey()) ?? '')
  })
</script>

<template>
  <div>
    <div>
      <div class="d-flex align-center">
        <div class="airportSearch mr-3">
          <v-text-field
            variant="solo"
            label="Airport"
            hide-details
            density="compact"
            v-model="airport"
            clearable
          ></v-text-field>
        </div>
        <v-btn icon="mdi-magnify" @click="get"></v-btn>
      </div>
      <div class="">
        <div class="d-flex align-end">
          <v-checkbox
            hide-details
            v-model="nearest"
            label="Search Nearest Airports"
          >
          </v-checkbox>
        </div>
        <v-chip-group selected-class="text-primary">
          <v-chip variant="elevated" @click="'test'">YBAF</v-chip>
          <v-chip variant="elevated" @click="'test'">YBBN</v-chip>
        </v-chip-group>
      </div>
    </div>
    <v-card
      v-if="showCard"
      :loading="loading"
      elevation="8"
      class="weather-card"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="blue-lighten-3"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-card-title v-if="loading"> Loading...</v-card-title>
      <v-card-title> {{ weather?.station.name }} </v-card-title>

      <v-card-text>
        <strong>METAR</strong> <br />
        {{ weather?.metar.raw_text }}
      </v-card-text>
      <v-card-text>
        <strong>Terminal Area Forecast</strong> <br />
        {{ weather?.taf.raw_text }}
      </v-card-text>
      <v-card-subtitle></v-card-subtitle>
    </v-card>
  </div>
</template>

<style>
  .airportSearch {
    min-width: 200px;
    max-width: 350px;
    width: 100%;
  }
  .airportChips {
    padding: 5px;
    gap: 5px;
  }

  .weather_card {
    max-width: 60%;
  }
</style>
