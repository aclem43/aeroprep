<script setup lang="ts">
  import type { LineMode } from '@/scripts/flight/tracking/trackingConstants'
  import {
    setTrackingInterval,
    setTrackingDecimal,
    setMinimumDistance,
    getTrackingInterval,
    getTrackingDecimal,
    getMinimumDistance,
    getLineMode,
    setLineMode,
  } from '@/scripts/settings/trackingsettings'
  import { openAlert } from '@/scripts/utils/alert'
  import { ref, type Ref, onMounted } from 'vue'

  const trackingInterval = ref()
  const trackingDecimal = ref()
  const minimumDistance = ref()
  const lineMode: Ref<LineMode> = ref('basic')

  const saveTrackingInterval = async () => {
    await setTrackingInterval(trackingInterval.value)
    openAlert('Tracking Interval Saved')
  }
  const saveTrackingDecimal = async () => {
    await setTrackingDecimal(trackingDecimal.value)
    openAlert('Tracking Decimal Saved')
  }
  const saveMinimumDistance = async () => {
    await setMinimumDistance(minimumDistance.value)
    openAlert('Minimum Distance Saved')
  }
  const saveLineMode = async () => {
    await setLineMode(lineMode.value)
    openAlert('Line Mode Saved')
  }
  onMounted(async () => {
    trackingInterval.value = await getTrackingInterval()
    trackingDecimal.value = await getTrackingDecimal()
    minimumDistance.value = await getMinimumDistance()
    lineMode.value = await getLineMode()
  })
</script>

<template>
  <div class="settings_input_row">
    <v-radio-group label="Map Line Mode" inline v-model="lineMode">
      <v-radio label="Basic" value="basic"></v-radio>
      <v-radio label="Altitude" value="altitude"></v-radio>
    </v-radio-group>
    <v-btn prepend-icon="mdi-content-save" @click="saveLineMode">Save</v-btn>
  </div>
  <div class="settings_input_row">
    <v-text-field
      v-model="trackingInterval"
      label="Tracking"
      hint="Time between getting GPS points"
      suffix="Milliseconds"
      variant="underlined"
      type="number"
      pattern="[0-9]*"
      inputmode="numeric"
    ></v-text-field>
    <v-btn prepend-icon="mdi-content-save" @click="saveTrackingInterval()">
      Save
    </v-btn>
  </div>
  <div class="settings_input_row">
    <v-text-field
      v-model="trackingDecimal"
      label="Tracking Decimal"
      hint="Accuracy of GPS points used"
      suffix="Decimal Places"
      variant="underlined"
      type="number"
      pattern="[0-9]*"
      inputmode="numeric"
    ></v-text-field>
    <v-btn prepend-icon="mdi-content-save" @click="saveTrackingDecimal()">
      Save
    </v-btn>
  </div>
  <div class="settings_input_row">
    <v-text-field
      v-model="minimumDistance"
      label="Tracking Decimal"
      hint="Minimum distance between GPS points"
      suffix="Nautical Miles"
      variant="underlined"
      type="number"
      pattern="[0-9]*"
      inputmode="numeric"
    ></v-text-field>
    <v-btn prepend-icon="mdi-content-save" @click="saveMinimumDistance()">
      Save
    </v-btn>
  </div>
  <div class="settings_input_row pb-2">
    <div>
      <div class="text-center">Acsending Line Color</div>
      <v-color-picker hide-inputs></v-color-picker>
    </div>
    <div>
      <div class="text-center">Cruise Line Color</div>
      <v-color-picker hide-inputs></v-color-picker>
    </div>
    <div>
      <div class="text-center">Descending Line Color</div>
      <v-color-picker hide-inputs></v-color-picker>
    </div>
  </div>
  <div class="p-2">
    <v-btn prepend-icon="mdi-content-save">Save</v-btn>
  </div>
</template>
