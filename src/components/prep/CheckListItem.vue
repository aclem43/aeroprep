<script setup lang="ts">
  import { getPage } from '@/scripts/prep/actionpage'
  import { ref } from 'vue'
  const page = getPage()
  const props = defineProps<{
    title: string
    description: string
    link?: string
  }>()
  const visible = ref(false)
  const toggleVisibilty = () => {
    visible.value = !visible.value
  }
  let showLink = false

  if (props.link != undefined) {
    showLink = true
  }
  const goTo = () => {
    page.value = props.link
  }
</script>

<template>
  <v-list-item>
    <v-list-item-title>
      <div class="d-flex justify-start">
        <v-checkbox hide-details density="compact" :label="title"></v-checkbox>
        <v-btn
          @click="toggleVisibilty"
          :icon="visible ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        ></v-btn>
      </div>
    </v-list-item-title>
    <v-fade-transition>
      <v-list-item-subtitle v-if="visible" class="d-flex justify-space-between"
        >{{ description }}
        <v-btn v-if="showLink" variant="outlined" @click="goTo">Go To</v-btn>
      </v-list-item-subtitle>
    </v-fade-transition>
  </v-list-item>
</template>
