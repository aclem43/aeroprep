<script setup lang="ts">
  import { page } from '@/scripts/prep/actionpage'
  import { ref } from 'vue'
  import FuelAction from './actions/FuelAction.vue'
  import WeatherAction from './actions/WeatherAction.vue'
</script>

<template>
  <v-card elevation="12">
    <v-tabs v-model="page" color="primary">
      <v-tab value="one">1</v-tab>
      <v-tab value="weather">Weather</v-tab>
      <v-tab value="fuel">Fuel</v-tab>
    </v-tabs>
    <v-card-item>
      <v-window v-model="page">
        <v-window-item value="2">One</v-window-item>
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
