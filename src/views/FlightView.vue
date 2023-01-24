<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'
  import TrackingMap from '@/components/flight.vue/TrackingMap.vue'
  import type { Flight } from '@/models/Flight'
  import {
    getCurrentFlightData,
    getAllPastFlights,
    startFlight,
    stopFlight,
  } from '@/scripts/flight/tracking'
  import { getNetworkStatus } from '@/scripts/network'
  import { computed, onMounted, ref, type Ref } from 'vue'

  const currentFlightData = getCurrentFlightData()

  const connection = getNetworkStatus()

  const running = computed(() => {
    if (currentFlightData.value == null) {
      return false
    } else return currentFlightData.value.running
  })
  const pastflights: Ref<Flight[]> = ref([])
  onMounted(async () => {
    console.log(await getAllPastFlights())

    pastflights.value = await getAllPastFlights()
  })
</script>
<template>
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
              <v-btn @click="startFlight()" :disabled="running">Start</v-btn>
              <v-btn @click="stopFlight()" :disabled="!running">Stop</v-btn>
              {{ pastflights }}
            </v-card-item>
            <v-card-item>
              <v-row no-gutters>
                <v-col>Speed</v-col>
                <v-col>Altitude</v-col>
                <v-col>Track</v-col>
                <v-col>Location</v-col>
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

  .flight_card_map {
    height: 400px;
  }
  .container {
    height: 100%;
    width: 100%;
    padding: 10px;
  }
</style>
