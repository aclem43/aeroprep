<script setup lang="ts">
  import { getPage, getPages } from '@/scripts/prep/actionpage'

  const page = getPage()
  const pages = getPages()
</script>

<template>
  <v-card elevation="12">
    <v-tabs v-model="page" show-arrows bg-color="primary">
      <v-tab v-for="tab in pages" :key="tab.name" :value="tab.shortName">
        <v-icon v-if="tab.icon"> {{ tab.icon }}</v-icon>
        {{ tab.name }}
      </v-tab>
    </v-tabs>

    <v-card-item>
      <v-window v-model="page">
        <v-window-item
          v-for="page in pages"
          :key="page.shortName"
          :value="page.shortName"
        >
          <component :is="page.component" />
        </v-window-item>
      </v-window>
    </v-card-item>
  </v-card>
</template>
