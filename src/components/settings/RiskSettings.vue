<script setup lang="ts">
  import {
    getMaxRiskScore,
    getWarnRiskScore,
    setMaxRiskScore,
    setWarnRiskScore,
  } from '@/scripts/settings/risksettings'
  import { openAlert } from '@/scripts/utils/alert'
  import { onMounted, ref } from 'vue'

  const maxRiskScore = ref(0)
  const warnRiskScore = ref(0)
  const saveMaxRiskScore = async () => {
    await setMaxRiskScore(maxRiskScore.value)
    openAlert('Max Risk Score Saved')
  }
  const saveWarnRiskScore = async () => {
    await setWarnRiskScore(warnRiskScore.value)
    openAlert('Warn Risk Score Saved')
  }
  onMounted(async () => {
    maxRiskScore.value = await getMaxRiskScore()
    warnRiskScore.value = await getWarnRiskScore()
  })
</script>
<template>
  <div class="settings_input_row">
    <v-text-field
      v-model="maxRiskScore"
      label="Max Risk Score"
      variant="underlined"
      type="number"
      pattern="[0-9]*"
      inputmode="numeric"
    ></v-text-field>
    <v-btn prepend-icon="mdi-content-save" @click="saveMaxRiskScore()">
      Save
    </v-btn>
  </div>
  <div class="settings_input_row">
    <v-text-field
      v-model="warnRiskScore"
      label="Warn Risk Score"
      variant="underlined"
      type="number"
      pattern="[0-9]*"
      inputmode="numeric"
    ></v-text-field>
    <v-btn prepend-icon="mdi-content-save" @click="saveWarnRiskScore()">
      Save
    </v-btn>
  </div>
</template>
