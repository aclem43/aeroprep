<script setup lang="ts">
  import { getCurrentFlight } from '@/scripts/prep/flightaction'
  import { getRiskList, type Risk } from '@/scripts/prep/riskaction'
  import RiskActionOverlay from '../overlays/RiskActionOverlay.vue'
  import { ref, onMounted, type Ref } from 'vue'

  const riskList: Ref<Risk[]> = ref([])
  const currentFlight = getCurrentFlight()
  const dual = currentFlight.value.dual
  const riskActionOverlay = ref()

  const openRiskActionOverlay = async () => {
    await riskActionOverlay.value.open()
  }
  const getScore = (risk: Risk) => {
    if (dual && risk.score.dual != null) {
      return risk.score.dual
    } else return risk.score.solo
  }

  onMounted(async () => {
    riskList.value = await getRiskList()
  })
</script>

<template>
  <div>
    <v-table density="compact">
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
        </tr>
      </tbody>
    </v-table>
    <v-btn variant="outlined" @click="openRiskActionOverlay">Open Editor</v-btn>
    <RiskActionOverlay ref="riskActionOverlay" />
  </div>
</template>
