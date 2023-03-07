<script setup lang="ts">
  import { getDevToolEnabled } from '@/scripts/settings/devTools'
  import { getConsoleText, getClasses } from '@/scripts/utils/logger'
  import { computed } from 'vue'

  const devToolEnabled = getDevToolEnabled()
  const logData = getConsoleText()
</script>
<template>
  <v-card v-if="devToolEnabled">
    <v-card-title> Console </v-card-title>
    <v-card-item>
      <div
        style="
          overflow: auto;
          display: flex;
          flex-direction: column-reverse;
          max-height: 200px;
        "
      >
        <v-sheet>
          <div
            v-for="log in logData"
            v-bind:key="log.id"
            class="d-flex"
            :class="getClasses(log)"
          >
            [{{ log.date.getHours() }}:{{ log.date.getMinutes() }}:{{
              log.date.getSeconds()
            }}]-[{{ log.level }}]
            {{ log.msg }}
          </div>
        </v-sheet>
      </div>
    </v-card-item>
  </v-card>
</template>
