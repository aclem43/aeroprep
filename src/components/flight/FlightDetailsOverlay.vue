<script setup lang="ts">
  import { calculateFlightDetails } from '@/scripts/flight/flightdetails'
  import { getCurrentFlightData } from '@/scripts/flight/tracking/recording'
  import { getCurrentFlight } from '@/scripts/prep/flightaction'
  import { ref } from 'vue'
  const dialog = ref()
  const flightDetails = ref()
  const open = async () => {
    dialog.value = true
    flightDetails.value = calculateFlightDetails(getCurrentFlightData().value)
  }
  defineExpose({ open })
</script>
<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title> Flight Details </v-card-title>
      <v-card-item> {{ flightDetails }} </v-card-item>
    </v-card>
  </v-dialog>
</template>
