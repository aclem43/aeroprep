<script setup lang="ts">
  import { getCurrentAircraft } from '@/scripts/aircraft'
  import { getCurrentFlight } from '@/scripts/prep/flightaction'
  import {
    type FuelRow,
    initFuelRows,
    saveFuelRows,
  } from '@/scripts/prep/fuelaction'
  import { getCurrentLiquidUnit } from '@/scripts/settings/unitsettings'
  import { openAlert } from '@/scripts/utils/alert'
  import { isMobile } from '@/scripts/utils/mobile'
  import { convertToCurrentLiquid } from '@/scripts/utils/units/units'
  import { computed } from 'vue'
  import { onMounted, reactive, ref } from 'vue'

  const currentAircraft = getCurrentAircraft()
  const currentFlight = getCurrentFlight()
  const fuelRows = reactive<FuelRow[]>([])
  const mobile = ref(false)
  onMounted(async () => {
    const d = await initFuelRows()
    Object.assign(fuelRows, d)
    mobile.value = isMobile()
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

  const fuelMarginClass = computed(() => {
    if (endurance.value < totalMin.value) {
      return 'text-error'
    }
    return 'text-success'
  })
</script>

<template>
  <div class="fuel_container">
    <table class="fuel_table">
      <thead>
        <tr>
          <th v-if="!mobile">Item</th>
          <th>Fuel Calculation</th>
          <th>Min</th>
          <th>{{ getCurrentLiquidUnit() }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in fuelRows" :key="idx">
          <td v-if="!mobile">{{ row.item }}</td>
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
          <td v-if="!mobile">H</td>
          <td>Fuel Required</td>
          <td class="text-surface-variant">{{ totalMin }}</td>
          <td class="text-surface-variant">
            {{ totalLitre }}
          </td>
        </tr>
        <tr>
          <td v-if="!mobile">I</td>
          <td>Endurance</td>
          <td class="text-surface-variant">{{ endurance }}</td>
          <td class="text-surface-variant">
            {{ currentFlight.currentFuel }}
          </td>
        </tr>
        <tr>
          <td v-if="!mobile">J</td>
          <td>Margin</td>
          <td :class="fuelMarginClass">
            {{ endurance - totalMin }}
          </td>
          <td :class="fuelMarginClass">
            {{
              convertToCurrentLiquid(
                currentFlight.currentFuel - totalLitre,
                'L'
              )
            }}
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
