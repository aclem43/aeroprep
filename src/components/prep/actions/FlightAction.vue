<script setup lang="ts">
  import {
    getCurrentFlight,
    saveFlight,
    resetCurrentFlight,
  } from '@/scripts/prep/flightaction'
  import { watch } from 'vue'

  const currentFlight = getCurrentFlight()

  watch(currentFlight.value, async (newFlight, oldFlight) => {
    await saveFlight(oldFlight)
  })
</script>

<template>
  <div class="flight_action">
    <div>
      <h3>Current Flight</h3>
      <div class="flight_action_flight_row">
        <v-btn variant="tonal" @click="resetCurrentFlight"
          >Reset<v-icon>mdi-restart</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
  <div class="flight_action">
    <div>
      <h3>Passenger</h3>
      <div class="flight_action_flight_row">
        <v-text-field
          class="flight_action_input"
          hide-details
          density="compact"
          type="number"
          variant="solo"
          label="Pilot Weight"
          inputmode="numeric"
        ></v-text-field>
        <v-switch
          class="flight_action_dual_switch"
          v-model="currentFlight.dual"
          :label="currentFlight.dual ? 'Dual' : 'Solo'"
          hide-details
          density="compact"
        ></v-switch>
        <v-fade-transition>
          <div v-if="currentFlight.dual" class="flight_action_flight_row">
            <v-checkbox
              density="compact"
              hide-details
              label="Passenger"
            ></v-checkbox>
            <v-text-field
              hide-details
              density="compact"
              type="number"
              variant="solo"
              label="Passenger Weight"
              inputmode="numeric"
              class="flight_action_input"
            ></v-text-field>
          </div>
        </v-fade-transition>
      </div>
    </div>
    <div>
      <h3>Aircraft Preperation</h3>
      <div class="flight_action_flight_row">
        <v-text-field
          hide-details
          density="compact"
          type="number"
          variant="solo"
          label="Fuel"
          inputmode="numeric"
          class="flight_action_input"
          v-model="currentFlight.currentFuel"
        ></v-text-field>
      </div>
    </div>
  </div>
</template>

<style>
  .flight_action {
    padding: 5px 15px;
  }
  .flight_action_dual_switch {
    max-width: max-content;
  }
  .flight_action_flight_row {
    display: flex;
    gap: 10px;
    min-height: 42px;
  }

  .flight_action_input {
    max-width: 300px;
  }
</style>
