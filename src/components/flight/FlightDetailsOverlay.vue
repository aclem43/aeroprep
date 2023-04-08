<script setup lang="ts">
  import { calculateFlightDetails } from '@/scripts/flight/flightdetails'
  import { getCurrentFlightData } from '@/scripts/flight/tracking/recording'
  import { getCurrentFlight } from '@/scripts/prep/flightaction'
  import {
    getCurrentDistanceUnit,
    getCurrentHeightUnit,
    getCurrentSpeedUnit,
  } from '@/scripts/settings/unitsettings'
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
      <v-card-item>
        <v-container>
          <v-row no-gutters>
            <v-col>
              Average Speed: {{ flightDetails.averageSpeed }}
              {{ getCurrentSpeedUnit() }}
            </v-col>
            <v-col>
              Max Speed: {{ flightDetails.maxSpeed }}
              {{ getCurrentSpeedUnit() }}
            </v-col>
            <v-col>
              Total Distance: {{ flightDetails.totalDistance }}
              {{ getCurrentDistanceUnit() }}
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              Max Altitude: {{ flightDetails.maxAltitude }}
              {{ getCurrentHeightUnit() }}
            </v-col>
            <v-col>
              Average Altitude: {{ flightDetails.averageAltitude }}
              {{ getCurrentHeightUnit() }}
            </v-col>
            <v-col> Total Time: {{ flightDetails.totalDuration }} </v-col>
          </v-row>
        </v-container>
      </v-card-item>
      <v-card-actions class="flex-row-reverse mx-4">
        <v-btn variant="outlined" @click="dialog = false"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
