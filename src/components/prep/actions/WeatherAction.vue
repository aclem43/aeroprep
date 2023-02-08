<script setup lang="ts">
  // Basics Done
  import { setApiKey, getWeather } from '@/scripts/prep/weatheraction'
  import { onMounted, ref, type Ref } from 'vue'
  import type { Weather } from '@/models/WeatherModels'
  import { getWeatherApiKey } from '@/scripts/settings/settings'
  import { openAlert } from '@/scripts/utils/alert'
  import { getAirportsRef, type Airport } from '@/scripts/airport'

  const airport = ref()
  const nearest = ref()
  const airports: Ref<Airport[]> = getAirportsRef()

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
    if (weather.value.station == null) {
      openAlert(
        'Airport not found or not avalible, try with the nearest airport Checked',
        3000
      )
      showCard.value = false
    }
    loading.value = false
  }

  const chipGet = async (value: String) => {
    airport.value = value
    await get()
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
            @keydown.enter="get"
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
          <v-chip
            variant="elevated"
            @click="chipGet(airport.code)"
            v-for="airport in airports"
            :key="airport.code"
            ><v-icon v-if="airport.home">mdi-home</v-icon>
            {{ airport.code }}</v-chip
          >
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
      <v-card-title> {{ weather?.station?.name }} </v-card-title>

      <v-card-text>
        <h3>METAR</h3>
        <h4>Key Factors</h4>
        <p>Flight Category: {{ weather?.metar?.flight_category }}</p>
        <p>Temperature: {{ weather?.metar?.temperature.celsius }}</p>
        <p>Visibilty : {{ weather?.metar?.visibility.meters_float }}</p>
        <p>
          Wind: {{ weather?.metar?.wind.degrees }}
          {{ weather?.metar?.wind.speed_kts + 'kts' }}
        </p>

        <h4>Raw Metar</h4>
        {{ weather?.metar?.raw_text }}
      </v-card-text>
      <v-card-text>
        <h3>Terminal Area Forecast</h3>
        {{ weather?.taf?.raw_text }}
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
