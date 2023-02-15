<script setup lang="ts">
  import { getCurrentAircraft } from '@/scripts/aircraft'
  import { getCurrentFlight } from '@/scripts/prep/flightaction'
  import {
    type FuelRow,
    initFuelRows,
    saveFuelRows,
  } from '@/scripts/prep/fuelaction'
  import { openAlert } from '@/scripts/utils/alert'
  import { computed } from 'vue'
  import { onMounted, reactive } from 'vue'

  const currentAircraft = getCurrentAircraft()
  const currentFlight = getCurrentFlight()
  const fuelRows = reactive<FuelRow[]>([])
  onMounted(async () => {
    const d = await initFuelRows()
    Object.assign(fuelRows, d)
  })

  const saveDefault = async () => {
    await saveFuelRows(fuelRows)
    openAlert('Defaults Saved')
  }
  const inputChangeMin = (index: number) => {
    if (currentAircraft.value == null) {
      openAlert('Pick an Aircraft')
      return
    }
    const min = fuelRows[index].fuelData.min
    fuelRows[index].fuelData.litre = (min / 60) * currentAircraft.value.fuelBurn
  }
  const inputChangeLitre = (index: number) => {
    if (currentAircraft.value == null) {
      openAlert('Pick a Aircraft')
      return
    }
    const litre = fuelRows[index].fuelData.litre

    fuelRows[index].fuelData.min = (litre / currentAircraft.value.fuelBurn) * 60
  }

  const totalMin = computed(() => {
    let min = 0
    for (const row of fuelRows) {
      min = min + row.fuelData.min
    }
    return Math.round(min * 100) / 100
  })
  const totalLitre = computed(() => {
    let litre = 0
    for (const row of fuelRows) {
      litre = litre + row.fuelData.litre
    }
    return Math.round(litre * 100) / 100
  })
  const endurance = computed(() => {
    if (currentAircraft.value == null) {
      return 0
    }
    return Math.round(
      (currentFlight.value.currentFuel / currentAircraft.value.fuelBurn) * 60
    )
  })
  const removeFocus = (event: KeyboardEvent) => {
    if (event.target) {
      ;(event.target as HTMLInputElement).blur()
    }
  }
</script>

<template>
  <div class="fuel_container">
    <table class="fuel_table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Fuel Calculation</th>
          <th>Min</th>
          <th>L</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in fuelRows" :key="idx">
          <td>{{ row.item }}</td>
          <td>{{ row.name }}</td>
          <td>
            <input
              type="number"
              pattern="[0-9]*"
              inputmode="numeric"
              v-model="row.fuelData.min"
              @input="inputChangeMin(idx)"
              @keyup.enter="removeFocus($event)"
            />
          </td>
          <td>
            <input
              type="number"
              pattern="[0-9]*"
              v-model="row.fuelData.litre"
              inputmode="numeric"
              @input="inputChangeLitre(idx)"
              @keydown.enter="removeFocus($event)"
            />
          </td>
        </tr>
        <tr>
          <td>H</td>
          <td>Fuel Required</td>
          <td class="bg-surface-variant">{{ totalMin }}</td>
          <td class="bg-surface-variant">{{ totalLitre }}</td>
        </tr>
        <tr>
          <td>I</td>
          <td>Endurance</td>
          <td class="bg-surface-variant">{{ endurance }}</td>
          <td class="bg-surface-variant">
            {{ currentFlight.currentFuel }}
          </td>
        </tr>
        <tr>
          <td>J</td>
          <td>Margin</td>
          <td class="bg-surface-variant">{{ endurance - totalMin }}</td>
          <td class="bg-surface-variant">
            {{ currentFlight.currentFuel - totalLitre }}
          </td>
        </tr>
      </tbody>
    </table>
    <v-card variant="text">
      <v-card-item>
        <v-btn variant="tonal" @click="saveDefault">Save Default</v-btn>
      </v-card-item>
    </v-card>
  </div>
</template>

<style>
  .fuel_container {
    display: flex;
    justify-content: space-between;
  }
  .fuel_table {
    border-collapse: collapse;
    border: black solid 2px;
    text-align: center;
    font-size: larger;
  }

  .fuel_table thead tr {
    border: black solid 2px;
  }
  .fuel_table thead th {
    padding: 20px 20px;
  }

  .fuel_table td {
    border: black solid 2px;
    width: max-content;
    padding: 0px 20px;
    white-space: nowrap;
    text-align: left;
  }

  .fuel_table input {
    outline: none;
    width: 70px;
    line-height: 30px;
    margin: 0;
    appearance: texfield;
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /* Firefox */
</style>
