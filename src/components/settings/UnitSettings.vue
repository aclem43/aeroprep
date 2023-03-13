<script setup lang="ts">
  import {
    distanceUnits,
    getCurrentDistanceUnitRef,
    getCurrentSpeedUnitRef,
    getCurrentHeightUnit,
    saveUnits,
    speedUnits,
  } from '@/scripts/settings/unitsettings'
  const speedUnit = getCurrentSpeedUnitRef()
  const heightUnit = getCurrentHeightUnit()
  const distanceUnit = getCurrentDistanceUnitRef()
</script>

<template>
  <div class="settings_input_row">
    <v-select
      variant="underlined"
      label="Speed Units"
      :items="speedUnits"
      v-model="speedUnit"
      style="max-width: 300px"
    ></v-select>
  </div>
  <div class="settings_input_row">
    <v-select
      variant="underlined"
      label="Height Units"
      :items="distanceUnits"
      v-model="heightUnit"
      style="max-width: 300px"
    ></v-select>
  </div>
  <div class="settings_input_row">
    <v-select
      variant="underlined"
      label="Distance Units"
      :items="distanceUnits"
      v-model="distanceUnit"
      style="max-width: 300px"
    ></v-select>
  </div>
  <v-btn prepend-icon="mdi-content-save" variant="outlined" @click="saveUnits">
    Save Units
  </v-btn>
</template>
