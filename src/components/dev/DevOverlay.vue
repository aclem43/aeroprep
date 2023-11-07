<script setup lang="ts">
  import { getAllSimpleDataKeys } from '@/scripts/database'
  import { getDevOverlayRef } from '@/scripts/dev/devOverlay'
  import { ref } from 'vue'
  import { onMounted } from 'vue'
  import type { Ref } from 'vue'

  import DevConsole from './DevConsole.vue'

  const dialog = getDevOverlayRef()
  const tab = ref('console')
  const dataKeys: Ref<string[]> = ref([])

  onMounted(async () => {
    dataKeys.value = await getAllSimpleDataKeys()
  })

  const reloadKeys = async () => {
    dataKeys.value = await getAllSimpleDataKeys()
  }
</script>
<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title> Dev Tools </v-card-title>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="console">Console</v-tab>
        <v-tab value="data">Data</v-tab>
        <v-tab value="three">Item Three</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="console">
            <DevConsole></DevConsole>
          </v-window-item>

          <v-window-item value="data">
            <v-btn @click="reloadKeys" variant="tonal">Reload</v-btn>
            {{ dataKeys }}
          </v-window-item>

          <v-window-item value="three"> Three </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
