<script setup lang="ts">
  import {
    setTrackingInterval,
    setTrackingDecimal,
    setMinimumDistance,
    getTrackingInterval,
    getTrackingDecimal,
    getMinimumDistance,
  } from '@/scripts/settings/settings'
  import { openAlert } from '@/scripts/utils/alert'
  import { ref, onMounted } from 'vue'

  const trackingInterval = ref()
  const trackingDecimal = ref()
  const minimumDistance = ref()

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
  onMounted(async () => {
    trackingInterval.value = await getTrackingInterval()
    trackingDecimal.value = await getTrackingDecimal()
    minimumDistance.value = await getMinimumDistance()
  })
</script>

<template>
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
      suffix="Nautical Miles"
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
      suffix="Decimal Places"
      variant="underlined"
      type="number"
      pattern="[0-9]*"
      inputmode="numeric"
    ></v-text-field>
    <v-btn prepend-icon="mdi-content-save" @click="saveMinimumDistance()">
      Save
    </v-btn>
  </div>
</template>
