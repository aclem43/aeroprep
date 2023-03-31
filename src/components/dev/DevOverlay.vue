<script setup lang="ts">
  import { getDevOverlayRef } from '@/scripts/dev/devOverlay'
  import DevConsole from './DevConsole.vue'
  import { ref } from 'vue'

  const dialog = getDevOverlayRef()
  const tab = ref('console')
</script>
<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title> Dev Tools </v-card-title>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="console">Console</v-tab>
        <v-tab value="two">Item Two</v-tab>
        <v-tab value="three">Item Three</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="console">
            <DevConsole></DevConsole>
          </v-window-item>

          <v-window-item value="two"> Two </v-window-item>

          <v-window-item value="three"> Three </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
