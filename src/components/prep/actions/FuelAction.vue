<script setup lang="ts">
  import { getCurrentAircraft } from '@/scripts/aircraft'
  import { openAlert } from '@/scripts/utils/alert'
  import { computed } from 'vue'
  import { type Ref, ref } from 'vue'

  const currentAircraft = getCurrentAircraft()

  interface FuelRow {
    item: string
    name: string
    fuelData: FuelData
  }

  interface FuelData {
    min: Ref<number>
    litre: Ref<number>
  }

  const initFuelData = (): FuelData => {
    return {
      min: ref(0),
      litre: ref(0),
    }
  }

  const fuelRows: FuelRow[] = [
    { item: 'A', name: 'Taxi Fuel', fuelData: initFuelData() },
    { item: 'B', name: 'Trip Fuel', fuelData: initFuelData() },
    { item: 'C', name: 'Varible Reserve (__% if B)', fuelData: initFuelData() },
    { item: 'D', name: 'Alternate Fuel', fuelData: initFuelData() },
    { item: 'E', name: 'Fixed Reserve', fuelData: initFuelData() },
    { item: 'F', name: 'Additional Fuel', fuelData: initFuelData() },
    { item: 'G', name: 'Holding Fuel', fuelData: initFuelData() },
  ]

  const inputChangeMin = (index: number) => {
    if (currentAircraft.value == null) {
      openAlert('Pick a Aircraft', 2000)
      return
    }
    const min = fuelRows[index].fuelData.min
    const litre = fuelRows[index].fuelData.litre
    litre.value = (min.value / 60) * currentAircraft.value.fuelBurn
  }
  const inputChangeLitre = (index: number) => {
    if (currentAircraft.value == null) {
      openAlert('Pick a Aircraft', 2000)
      return
    }
    const min = fuelRows[index].fuelData.min
    const litre = fuelRows[index].fuelData.litre
    min.value = (litre.value / currentAircraft.value.fuelBurn) * 60
  }

  const totalMin = computed(() => {
    let min = 0
    for (const row of fuelRows) {
      min = min + row.fuelData.min.value
    }
    return Math.round(min * 100) / 100
  })
  const totalLitre = computed(() => {
    let litre = 0
    for (const row of fuelRows) {
      litre = litre + row.fuelData.litre.value
    }
    return Math.round(litre * 100) / 100
  })

  const removeFocus = (event: KeyboardEvent) => {
    if (event.target) {
      ;(event.target as HTMLInputElement).blur()
    }
  }
</script>

<template>
  <div>
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
        <tr v-for="(row, idx) in fuelRows" :key="row.item">
          <td>{{ row.item }}</td>
          <td>{{ row.name }}</td>
          <td>
            <input
              type="number"
              pattern="[0-9]*"
              inputmode="numeric"
              v-model="row.fuelData.min.value"
              @input="inputChangeMin(idx)"
              @keyup.enter="removeFocus($event)"
            />
          </td>
          <td>
            <input
              type="number"
              pattern="[0-9]*"
              v-model="row.fuelData.litre.value"
              inputmode="numeric"
              @input="inputChangeLitre(idx)"
              @keydown.enter="removeFocus($event)"
            />
          </td>
        </tr>
        <!--  -->
        <tr>
          <td>H</td>
          <td>Fuel Required</td>
          <td>{{ totalMin }}</td>
          <td>{{ totalLitre }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
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
