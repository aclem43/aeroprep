<script setup lang="ts">
  import { page } from '@/scripts/prep/actionpage'
  import FlightAction from './actions/FlightAction.vue'
  import FuelAction from './actions/FuelAction.vue'
  import NoteAction from './actions/NoteAction.vue'
  import RiskAction from './actions/RiskAction.vue'
  import WeatherAction from './actions/WeatherAction.vue'
</script>

<template>
  <v-card elevation="12">
    <v-tabs v-model="page" bg-color="primary">
      <v-tab value="flight"> Todays Flight </v-tab>
      <v-tab value="weather">
        <v-icon style="margin-right: 10px">mdi-cloud</v-icon>
        Weather
      </v-tab>
      <v-tab value="fuel">
        <v-icon style="margin-right: 10px">mdi-fuel</v-icon>
        Fuel
      </v-tab>
      <v-tab value="risk">
        <v-icon style="margin-right: 10px">
          mdi-order-bool-ascending-variant
        </v-icon>
        Risk assessment
      </v-tab>
      <v-tab value="note">
        <v-icon style="margin-right: 10px"> mdi-note </v-icon>
        Notes
      </v-tab>
    </v-tabs>
    <v-card-item>
      <v-window v-model="page">
        <v-window-item value="flight">
          <FlightAction></FlightAction>
        </v-window-item>
        <v-window-item value="weather">
          <WeatherAction></WeatherAction>
        </v-window-item>
        <v-window-item value="fuel">
          <FuelAction></FuelAction>
        </v-window-item>
        <v-window-item value="risk">
          <RiskAction></RiskAction>
        </v-window-item>
        <v-window-item value="note">
          <NoteAction></NoteAction>
        </v-window-item>
      </v-window>
    </v-card-item>
  </v-card>
</template>
