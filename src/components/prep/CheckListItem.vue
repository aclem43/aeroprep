<script setup lang="ts">
  import { page } from '@/scripts/prep/actionpage'
  import { ref } from 'vue'

  const props = defineProps<{
    title: string
    description: string
    link?: string
  }>()
  const show = ref(false)
  let showLink = false

  if (props.link != undefined) {
    showLink = true
  }
  const goTo = () => {
    page.value = props.link
  }
</script>

<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between">
      <v-checkbox :label="title" hide-details></v-checkbox>
      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        variant="plain"
        @click="show = !show"
      ></v-btn
    ></v-card-title>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ description }}
        </v-card-text>
        <v-card-actions v-if="showLink" class="justify-end">
          <v-btn variant="elevated" elevation="4" @click="goTo">Go To</v-btn>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>
