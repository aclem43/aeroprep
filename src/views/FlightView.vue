<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'
  import FlightSaveOverlay from '@/components/flight/FlightSaveOverlay.vue'
  import TrackingMap from '@/components/flight/TrackingMap.vue'
  import type { FlightLocation } from '@/models/Flight'
  import {
    getCurrentFlightData,
    startFlight,
    stopFlight,
  } from '@/scripts/flight/tracking/recording'
  import { getNetworkStatus } from '@/scripts/network'
  import { computed, ref } from 'vue'

  const currentFlightData = getCurrentFlightData()
  const connection = getNetworkStatus()
  const flightSaveOverlay = ref()

  const running = computed(() => {
    if (currentFlightData.value == null) {
      return false
    } else return currentFlightData.value.running
  })
  const openFlightSaveOverlay = async () => {
    await flightSaveOverlay.value.open()
  }
  const latestFlightLoc = computed((): FlightLocation => {
    if (!currentFlightData.value) {
      return {
        alitude: 0,
        cord: { lattitude: 0, longitude: 0 },
        heading: 0,
        speed: 0,
        time: 0,
      }
    } else if (currentFlightData.value.flightPath.length == 0) {
      return {
        alitude: 0,
        cord: { lattitude: 0, longitude: 0 },
        heading: 0,
        speed: 0,
        time: 0,
      }
    } else {
      return currentFlightData.value.flightPath[
        currentFlightData.value.flightPath.length - 1
      ]
    }
  })
</script>
<template>
  <FlightSaveOverlay ref="flightSaveOverlay"></FlightSaveOverlay>
  <AppBar />
  <v-main>
    <div class="container">
      <v-card class="flight_card">
        <v-card-item>
          <div v-if="connection.connected" class="flight_card_map">
            <TrackingMap></TrackingMap>
          </div>
          <div v-else class="flight_card_map">
            Not connected to the internet, the flight will still record but to
            use the map, connect the device to the internet
          </div>
        </v-card-item>

        <v-card-item>
          <v-card variant="tonal">
            <v-card-item>
              <div class="d-flex justify-space-between">
                <div class="d-flex gap">
                  <v-btn
                    @click="startFlight()"
                    :disabled="running"
                    variant="tonal"
                    >Start</v-btn
                  >
                  <v-btn
                    @click="stopFlight()"
                    :disabled="!running"
                    variant="tonal"
                    >Stop</v-btn
                  >
                </div>
                <div>
                  <v-btn variant="tonal" @click="openFlightSaveOverlay()"
                    ><v-icon>mdi-menu</v-icon></v-btn
                  >
                </div>
              </div>
            </v-card-item>
            <v-card-item>
              <v-row no-gutters>
                <v-col>Speed</v-col>
                <v-col>Altitude</v-col>
                <v-col>Track</v-col>
                <v-col>Location</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>{{ latestFlightLoc.speed }}</v-col>
                <v-col>{{ latestFlightLoc.alitude }}</v-col>
                <v-col>{{ latestFlightLoc.heading }}</v-col>
                <v-col>{{ latestFlightLoc.cord }}</v-col>
              </v-row>
            </v-card-item>
          </v-card>
        </v-card-item>
      </v-card>
    </div>
  </v-main>
</template>

<style>
  .flight_card {
    width: 100%;
  }
  .gap {
    gap: 10px;
  }

  .flight_card_map {
    height: 400px;
  }
  .container {
    height: 100%;
    width: 100%;
    padding: 10px;
  }
</style>
