<script setup lang="ts">
  import {
    loadStorageInfo,
    getStorageInfo,
    getDevToolEnabled,
  } from '@/scripts/settings/devTools'
  import { ref } from 'vue'

  const devTools = getDevToolEnabled()
  const storageInfo = getStorageInfo()
</script>

<template>
  <div class="settings_input_row">
    <v-switch
      v-model="devTools"
      color="warning"
      hide-details
      :label="devTools ? 'Hide' : 'Show'"
    ></v-switch>
  </div>
  <div v-if="devTools" class="settings_input_row">
    <v-btn color="info" @click="loadStorageInfo"
      ><v-icon>mdi-reload</v-icon> Load Data</v-btn
    >
    <v-btn color="info" v-clipboard:copy="storageInfo"
      ><v-icon>mdi-clipboard</v-icon>Storage To Clip Board</v-btn
    >
  </div>
</template>
