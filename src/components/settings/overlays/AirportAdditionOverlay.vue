<script setup lang="ts">
  import { addAirport } from '@/scripts/airport'
  import { openAlert } from '@/scripts/utils/alert'
  import { ref } from 'vue'

  const dialog = ref()

  const open = () => {
    dialog.value = true
  }

  defineExpose({ open })

  const airportCode = ref('')
  const homeAirport = ref(false)

  const createAirport = () => {
    addAirport({ home: homeAirport.value, code: airportCode.value })
    openAlert('Airport added', 2000)
    dialog.value = false
    homeAirport.value = false
    airportCode.value = ''
  }
</script>
<template>
  <v-dialog v-model="dialog" persistent class="aircraftCreationDialog">
    <v-card>
      <v-card-title> Create aircraft </v-card-title>
      <v-card-item>
        <v-text-field
          hide-details
          density="compact"
          variant="solo"
          label="Airport Code (ICAO,IATA)"
          v-model="airportCode"
        ></v-text-field>

        <v-checkbox
          density="compact"
          label="Home Airport"
          v-model="homeAirport"
          messages="Warning Will Overwrite Current Home Airport"
        ></v-checkbox>
      </v-card-item>
      <v-card-actions class="justify-space-between ms-4">
        <v-btn @click="dialog = false" variant="tonal"> Close</v-btn>
        <v-btn @click="createAirport" variant="tonal">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
