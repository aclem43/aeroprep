<script setup lang="ts">
  import { addAircraft } from '@/scripts/aircraft'
  import { openAlert } from '@/scripts/utils/alert'
  import { ref } from 'vue'

  const dialog = ref()

  const open = () => {
    dialog.value = true
  }

  defineExpose({ open })

  const aircraftName = ref('')
  const aircraftFuelBurn = ref(0)

  const createAircraft = () => {
    addAircraft({ name: aircraftName.value, fuelBurn: aircraftFuelBurn.value })
    openAlert('Aircraft Created', 2000)
    dialog.value = false
    aircraftName.value = ''
    aircraftFuelBurn.value = 0
  }
</script>

<template>
  <v-dialog v-model="dialog" persistent class="aircraftCreationDialog">
    <v-card>
      <v-card-title> Create aircraft </v-card-title>
      <v-card-item>
        <div class="aircraftCreationDialog_form">
          <v-text-field
            variant="solo"
            hide-details
            density="compact"
            label="Aircraft Name"
            v-model="aircraftName"
          ></v-text-field>
          <v-text-field
            variant="solo"
            hide-details
            density="compact"
            label="Fuel Burn (l/h)"
            v-model="aircraftFuelBurn"
            type="number"
            inputmode="numeric"
            pattern="[0-9]*"
          ></v-text-field>
        </div>
        <div class="aircraftCreationDialog_form_right"></div>
      </v-card-item>
      <v-card-actions class="justify-space-between ms-4">
        <v-btn @click="dialog = false" variant="tonal"> Close</v-btn>
        <v-btn @click="createAircraft" variant="tonal">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
  .aircraftCreationDialog {
    max-width: 800px;
  }
  .aircraftCreationDialog_form {
    padding: 10px;
    display: flex;
    gap: 10px;
  }
  .aircraftCreationDialog_form_right {
    justify-content: right;
    padding: 10px;
    display: flex;
    gap: 10px;
  }
</style>
