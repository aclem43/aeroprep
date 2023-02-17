<script setup lang="ts">
  import { getCurrentFlight } from '@/scripts/prep/flightaction'
  import { getDefualtRiskList, type Risk } from '@/scripts/prep/riskaction'

  const defaultRisk = getDefualtRiskList()
  const currentFlight = getCurrentFlight()
  const dual = currentFlight.value.dual

  const getScore = (risk: Risk) => {
    if (dual && risk.score.dual != null) {
      return risk.score.dual
    } else return risk.score.solo
  }
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
        <tr v-for="risk in defaultRisk" :key="risk.name">
          <td>{{ risk.name }}</td>
          <td>{{ getScore(risk) }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
