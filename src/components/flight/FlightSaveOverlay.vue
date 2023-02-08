<script setup lang="ts">
  import type { Flight } from '@/models/Flight'
  import {
    getAllPastFlights,
    deleteFlight,
    setCurrentFlight,
  } from '@/scripts/flight/tracking'
  import { openAlert } from '@/scripts/utils/alert'
  import { Dialog } from '@capacitor/dialog'
  import { ref, onMounted, type Ref } from 'vue'

  const dialog = ref()
  const pastFlights: Ref<Flight[]> = ref([])

  const open = async () => {
    dialog.value = true
    await updatePastFlights()
  }

  const getDateInfo = (flight: Flight) => {
    const dateInfo = new Date(flight.time.startTime).toLocaleString()
    let flightTime = '0'
    if (flight.time.endTime) {
      flightTime = new Date(flight.time.endTime - flight.time.startTime)
        .getMinutes()
        .toString()
    }
    const returnData = `${dateInfo} ${flightTime}min`
    return returnData
  }

  const updatePastFlights = async () => {
    pastFlights.value = await getAllPastFlights()
  }
  const deleteSave = async (flight: Flight) => {
    const { value } = await Dialog.confirm({
      title: 'Confirm',
      message: `Are you sure you want to delete the Flight Save?`,
    })
    if (value) {
      await deleteFlight(flight)
      await updatePastFlights()
      openAlert('Flight Save deleted', 2000)
    }
  }
  const loadSave = (flight: Flight) => {
    setCurrentFlight(flight)
    openAlert('Flight Loaded', 2000)
  }
  defineExpose({ open })
</script>

<template>
  <v-dialog v-model="dialog" class="aircraftCreationDialog">
    <v-card>
      <v-card-title> Flight Saves </v-card-title>
      <v-card-item>
        {{ pastFlights.length }}

        <v-list lines="one" density="compact">
          <v-list-item
            v-for="flight in pastFlights"
            :key="flight.time.startTime"
            density="compact"
          >
            <v-list-item-title class="d-flex justify-space-between">
              {{ getDateInfo(flight) }}
              <div class="btn_group">
                <v-btn variant="tonal" @click="loadSave(flight)"
                  ><v-icon>mdi-open-in-app</v-icon></v-btn
                >
                <v-btn variant="tonal" @click="deleteSave(flight)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </div>
            </v-list-item-title>
            <v-list-item-subtitle>
              Number Of GPS points
              {{ flight.flightPath.length }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-item>
    </v-card>
  </v-dialog>
</template>

<style>
  .btn_group {
    display: flex;
    gap: 10px;
  }
</style>
