<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'
  import FlightDetailsOverlay from '@/components/flight/FlightDetailsOverlay.vue'
  import FlightSaveOverlay from '@/components/flight/FlightSaveOverlay.vue'
  import MapOptionsOverlay from '@/components/flight/MapOptionsOverlay.vue'
  import TrackingMap from '@/components/flight/TrackingMap.vue'
  import type { FlightLocation } from '@/models/Flight'
  import {
    getCurrentFlightData,
    startFlight,
    stopFlight,
  } from '@/scripts/flight/tracking/recording'
  import { getNetworkStatus } from '@/scripts/network'
  import {
    getCurrentHeightUnit,
    getCurrentSpeedUnit,
  } from '@/scripts/settings/unitsettings'
  import {
    convertToCurrentHeight,
    convertToCurrentSpeed,
  } from '@/scripts/utils/units/units'
  import { computed, ref } from 'vue'

  const currentFlightData = getCurrentFlightData()
  const connection = getNetworkStatus()
  const flightSaveOverlay = ref()
  const flightDetailsOverlay = ref()
  const mapOptionsOverlay = ref()
  const fullscreen = ref(false)

  const running = computed(() => {
    if (currentFlightData.value == null) {
      return false
    } else return currentFlightData.value.running
  })

  const toggleFullScreen = () => {
    fullscreen.value = !fullscreen.value
  }
  const mapSize = computed(() => {
    if (fullscreen.value) {
      return 'flight_card_map_fullscreen'
    } else {
      return 'flight_card_map_normal'
    }
  })

  const openFlightSaveOverlay = async () => {
    await flightSaveOverlay.value.open()
  }
  const openFlightDetailsOverlay = async () => {
    await flightDetailsOverlay.value.open()
  }
  const openMapOptionsOverlay = async () => {
    await mapOptionsOverlay.value.open()
  }

  const latestFlightLoc = computed((): FlightLocation => {
    if (!currentFlightData.value) {
      return {
        altitude: 0,
        cord: { lattitude: 0, longitude: 0 },
        heading: 0,
        speed: 0,
        time: 0,
      }
    } else if (currentFlightData.value.flightPath.length == 0) {
      return {
        altitude: 0,
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
  <FlightDetailsOverlay ref="flightDetailsOverlay"></FlightDetailsOverlay>
  <MapOptionsOverlay ref="mapOptionsOverlay"></MapOptionsOverlay>
  <AppBar />
  <v-main>
    <div class="container">
      <v-card class="flight_card">
        <v-card-item>
          <div v-if="connection.connected" :class="mapSize">
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
                <div style="display: flex; gap: 10px">
                  <v-btn variant="tonal" @click="openFlightDetailsOverlay()">
                    <v-icon>mdi-information-box</v-icon>
                  </v-btn>
                  <v-btn variant="tonal" @click="toggleFullScreen">
                    <v-icon v-if="!fullscreen">mdi-fullscreen</v-icon>
                    <v-icon v-else>mdi-fullscreen-exit</v-icon>
                  </v-btn>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn variant="tonal" v-bind="props">
                        <v-icon>mdi-menu</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="openFlightSaveOverlay()">
                        <v-list-item-title>Flight Saves</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="openMapOptionsOverlay()">
                        <v-list-item-title>Map Options</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>
            </v-card-item>
            <v-card-item v-if="!fullscreen">
              <v-row no-gutters>
                <v-col>Speed</v-col>
                <v-col>Altitude</v-col>
                <v-col>Track</v-col>
                <v-col>Location</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  {{
                    convertToCurrentSpeed(latestFlightLoc.speed ?? 0, 'MPS') +
                    ' ' +
                    getCurrentSpeedUnit()
                  }}
                </v-col>
                <v-col>
                  {{
                    convertToCurrentHeight(latestFlightLoc.altitude ?? 0, 'M') +
                    ' ' +
                    getCurrentHeightUnit()
                  }}
                </v-col>
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

  .flight_card_map_normal {
    height: 50vh;
  }
  .flight_card_map_fullscreen {
    height: 70vh;
  }
  .container {
    height: 100%;
    width: 100%;
    padding: 10px;
  }
</style>
