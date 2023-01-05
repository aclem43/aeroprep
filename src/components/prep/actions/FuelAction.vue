<script setup lang="ts">
  import { getCurrentAircraft } from '@/scripts/aircraft'
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
    const min = fuelRows[index].fuelData.min
    const litre = fuelRows[index].fuelData.litre
    litre.value = (min.value / 60) * currentAircraft.value.fuelBurn
  }
  const inputChangeLitre = (index: number) => {
    const min = fuelRows[index].fuelData.min
    const litre = fuelRows[index].fuelData.litre
    min.value = (litre.value / currentAircraft.value.fuelBurn) * 60
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
              v-on:input="inputChangeMin(idx)"
            />
          </td>
          <td>
            <input
              type="number"
              pattern="[0-9]*"
              v-model="row.fuelData.litre.value"
              inputmode="numeric"
              v-on:input="inputChangeLitre(idx)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
  .fuel_table {
    width: 50%;
    border-collapse: collapse;
    border: black solid 2px;
    text-align: center;
  }
  .fuel_table thead tr {
    border: black solid 2px;
  }
  .fuel_table thead th {
    padding: 10px 20px;
  }

  .fuel_table td {
    border: black solid 2px;
  }

  .fuel_table input {
    outline: none;
    min-width: 20px;
    width: 30px;
    margin: 0;
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /* Firefox */
</style>
