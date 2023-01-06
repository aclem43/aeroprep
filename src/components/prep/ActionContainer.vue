<script setup lang="ts">
  import { page } from '@/scripts/prep/actionpage'
  import FuelAction from './actions/FuelAction.vue'
  import WeatherAction from './actions/WeatherAction.vue'
</script>

<template>
  <v-card elevation="12">
    <v-tabs v-model="page" bg-color="primary">
      <v-tab value="weather">
        <v-icon style="margin-right: 10px">mdi-cloud</v-icon>
        Weather
      </v-tab>
      <v-tab value="fuel">
        <v-icon style="margin-right: 10px">mdi-fuel</v-icon>
        Fuel
      </v-tab>
    </v-tabs>
    <v-card-item>
      <v-window v-model="page">
        <v-window-item value="weather">
          <WeatherAction></WeatherAction>
        </v-window-item>
        <v-window-item value="fuel">
          <FuelAction></FuelAction>
        </v-window-item>
      </v-window>
    </v-card-item>
  </v-card>
</template>
