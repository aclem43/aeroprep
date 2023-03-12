<script setup lang="ts">
  import {
    getCurrentRiskList,
    saveRiskList,
    type Risk,
  } from '@/scripts/prep/riskaction'
  import { openAlert } from '@/scripts/utils/alert'
  import { logger } from '@/scripts/utils/logger'
  import { ref, type Ref } from 'vue'
  import draggable from 'vuedraggable'
  const dialog = ref()
  const riskList: Ref<Risk[]> = ref(getCurrentRiskList().value)
  const solo = ref('1')

  const open = () => {
    dialog.value = true
  }

  const addRisk = () => {
    riskList.value.push({
      name: 'New Risk',
      score: { solo: 0, dual: 0 },
    })
    logger.log('New Risk Added')
  }
  const deleteRisk = (index: number) => {
    riskList.value.splice(index, 1)
    logger.log('Risk Deleted')
  }
  const save = () => {
    saveRiskList(riskList.value)
    openAlert('Risk List Saved')
    dialog.value = false
  }
  defineExpose({ open })
</script>
<template>
  <v-dialog v-model="dialog" persistent>
    <v-card>
      <v-card-title>Risk Assesment Editor</v-card-title>
      <v-card-item>
        <div class="d-flex">
          <v-radio-group hide-details inline mandatory v-model="solo">
            <v-radio label="Solo" value="1"></v-radio>
            <v-radio label="Dual" value="2"></v-radio>
          </v-radio-group>
          <div class="mr-12">
            <v-btn icon @click="addRisk"><v-icon>mdi-plus</v-icon></v-btn>
          </div>
        </div>
        <v-table density="compact" fixed-header height="400px">
          <thead>
            <tr>
              <th></th>
              <th class="text-left">Risk</th>
              <th class="text-left">Score</th>
              <th class="text-left">Delete</th>
            </tr>
          </thead>
          <draggable
            v-model="riskList"
            group="risk"
            tag="tbody"
            item-key="name"
            handle=".handle"
          >
            <template #item="{ element, index }">
              <tr>
                <td width="5%" class="handle">
                  <v-icon size="40">mdi-menu</v-icon>
                </td>
                <td width="75%">
                  <v-text-field
                    density="compact"
                    hide-details
                    v-model="element.name"
                    label="Name"
                  ></v-text-field>
                </td>
                <td width="15%">
                  <v-text-field
                    density="compact"
                    label="Solo"
                    hide-details
                    v-model="element.score.solo"
                  ></v-text-field>
                  <v-text-field
                    density="compact"
                    label="Dual"
                    hide-details
                    v-model="element.score.dual"
                  ></v-text-field>
                </td>
                <td width="5%" style="padding: 2px 0px">
                  <v-btn icon @click="deleteRisk(index)"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </td>
              </tr>
            </template>
          </draggable>
        </v-table>
      </v-card-item>

      <v-card-actions>
        <v-btn variant="outlined" @click="dialog = false">Close</v-btn>
        <v-btn variant="outlined" @click="save"> Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
