<script setup lang="ts">
  import {
    getCurrentDistanceUnitRef,
    getCurrentSpeedUnitRef,
    getCurrentHeightUnitRef,
    getCurrentWeightUnitRef,
    getCurrentLiquidUnitRef,
    saveUnits,
  } from '@/scripts/settings/unitsettings'
  import type {
    DistanceUnit,
    LiquidUnit,
    SpeedUnit,
    WeightUnit,
  } from '@/scripts/utils/units/unitstypes'
  const speedUnit = getCurrentSpeedUnitRef()
  const heightUnit = getCurrentHeightUnitRef()
  const distanceUnit = getCurrentDistanceUnitRef()
  const weightUnit = getCurrentWeightUnitRef()
  const liquidUnit = getCurrentLiquidUnitRef()

  const speedUnits: SpeedUnit[] = ['KMH', 'KTS', 'MPH']
  const distanceUnits: DistanceUnit[] = ['KM', 'NM', 'FT', 'M']
  const weightUnits: WeightUnit[] = ['kg', 'lbs']
  const liquidUnits: LiquidUnit[] = ['L', 'gal(UK)', 'gal(US)']
</script>

<template>
  <div class="settings_column_container">
    <div class="settings_column">
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
      <v-btn
        prepend-icon="mdi-content-save"
        variant="outlined"
        @click="saveUnits"
      >
        Save Units
      </v-btn>
    </div>
    <div class="settings_column">
      <div class="settings_input_row">
        <v-select
          variant="underlined"
          label="Weight Units"
          :items="weightUnits"
          v-model="weightUnit"
          style="max-width: 300px"
        ></v-select>
      </div>
      <div class="settings_input_row">
        <v-select
          variant="underlined"
          label="Liquid Units"
          :items="liquidUnits"
          v-model="liquidUnit"
          style="max-width: 300px"
        ></v-select>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .settings_column_container {
    display: flex;
    gap: 20px;
  }
  .settings_column {
    min-width: 100px;
  }
</style>
