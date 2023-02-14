<script setup lang="ts">
  import { getCurrentFlight } from '@/scripts/prep/flightaction'

  const currentFlight = getCurrentFlight()
  const dual = currentFlight.dual
  const fuel = currentFlight.fuel
</script>

<template>
  <div class="flight_action">
    <div>
      <h3>Passenger</h3>
      <div class="flight_action_flight_row">
        <v-switch
          class="flight_action_dual_switch"
          v-model="dual"
          :label="dual ? 'Dual' : 'Solo'"
          hide-details
          density="compact"
        ></v-switch>
        <v-fade-transition>
          <div v-if="dual" class="flight_action_flight_row">
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
          class="flight_action_fuel"
          v-model="fuel"
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

  .flight_action_fuel {
    max-width: 300px;
  }
</style>
