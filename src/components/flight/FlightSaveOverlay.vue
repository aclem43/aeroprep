<script setup lang="ts">
  import type { Flight } from '@/models/Flight'
  import { getAllPastFlights, deleteFlight } from '@/scripts/flight/tracking'
  import { openAlert } from '@/scripts/utils/alert'
  import { Dialog } from '@capacitor/dialog'
  import { ref, onMounted, type Ref } from 'vue'

  const dialog = ref()
  const pastFlights: Ref<Flight[]> = ref([])

  const open = async () => {
    dialog.value = true
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
  onMounted(async () => {
    await updatePastFlights()
  })
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

      openAlert('Flight Save deleted', 2000)
      updatePastFlights()
    }
  }
  defineExpose({ open })
</script>

<template>
  <template>
    <v-dialog v-model="dialog" class="aircraftCreationDialog">
      <v-card>
        <v-card-title> Flight Saves </v-card-title>
        <v-card-item>
          <v-list lines="one">
            <v-list-item
              v-for="flight in pastFlights"
              :key="flight.time.startTime"
            >
              <v-list-item-title class="d-flex justify-space-between">
                {{ getDateInfo(flight) }}
                <v-btn variant="tonal" @click="deleteSave(flight)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-item>
      </v-card>
    </v-dialog>
  </template>
</template>
