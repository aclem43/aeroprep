<script setup lang="ts">
  import { getCurrentFlight } from '@/scripts/prep/flightaction'
  import { getCurrentRiskList, type Risk } from '@/scripts/prep/riskaction'
  import RiskActionOverlay from '../overlays/RiskActionOverlay.vue'
  import { ref, type Ref, computed, onMounted } from 'vue'
  import {
    getMaxRiskScore,
    getWarnRiskScore,
  } from '@/scripts/settings/risksettings'

  const riskList: Ref<Risk[]> = getCurrentRiskList()

  const riskScore = ref(0)
  const currentFlight = getCurrentFlight()
  const riskActionOverlay = ref()
  const openRiskActionOverlay = () => {
    riskActionOverlay.value.open()
  }

  const onCheckClick = (event: Event, risk: Risk) => {
    const checkBox = event.target as HTMLInputElement
    if (checkBox.checked) {
      riskScore.value += getScore(risk)
    } else {
      riskScore.value -= getScore(risk)
    }
  }
  const getScore = (risk: Risk) => {
    if (currentFlight.value.dual && risk.score.dual != null) {
      return risk.score.dual
    } else return risk.score.solo
  }
  let maxRiskScore = 0
  let warnRiskScore = 0

  onMounted(async () => {
    maxRiskScore = await getMaxRiskScore()
    warnRiskScore = await getWarnRiskScore()
  })

  const totalScoreDynClass = computed(() => {
    if (riskScore.value > maxRiskScore) {
      return 'text-red'
    } else if (riskScore.value > warnRiskScore) {
      return 'text-yellow'
    }
    return 'text-green'
  })
</script>

<template>
  <div>
    <v-switch
      class="flight_action_dual_switch"
      v-model="currentFlight.dual"
      :label="currentFlight.dual ? 'Dual' : 'Solo'"
      hide-details
      density="compact"
    ></v-switch>
    <v-table density="compact" fixed-header height="400px">
      <thead>
        <tr>
          <th class="text-left">Risk</th>
          <th class="text-left">Score</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="risk in riskList" :key="risk.name">
          <td>{{ risk.name }}</td>
          <td>{{ getScore(risk) }}</td>
          <td>
            <v-checkbox
              hide-details
              density="compact"
              @click="onCheckClick($event, risk)"
            ></v-checkbox>
          </td>
        </tr>
        <tr>
          <td>Total</td>
          <td :class="totalScoreDynClass">{{ riskScore }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-btn variant="outlined" @click="openRiskActionOverlay">Open Editor</v-btn>
    <RiskActionOverlay ref="riskActionOverlay" />
  </div>
</template>
