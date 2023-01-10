<script setup lang="ts">
  import { getDefualtRiskList } from '@/scripts/prep/riskaction'

  const defaultRisk = getDefualtRiskList()
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
          <td>{{ risk.score }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
