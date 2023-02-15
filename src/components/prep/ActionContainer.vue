<script setup lang="ts">
  import { getPage, getPages, type Page } from '@/scripts/prep/actionpage'
  import { nextTick } from 'vue'

  const page = getPage()
  const pages = getPages()

  const addItem = (newPage: Page) => {
    const removed = pages.pages.splice(0, 1)
    pages.pages.push(
      ...pages.morePages.splice(pages.morePages.indexOf(newPage), 1)
    )
    pages.morePages.push(...removed)
    nextTick(() => {
      page.value = newPage.shortName
    })
  }
</script>

<template>
  <v-card elevation="12">
    <v-tabs v-model="page" fixed-tabs color="primary">
      <v-tab v-for="tab in pages.pages" :key="tab.name" :value="tab.shortName">
        <v-icon v-if="tab.icon"> {{ tab.icon }}</v-icon>
        {{ tab.name }}
      </v-tab>

      <v-menu v-if="pages.morePages.length">
        <template v-slot:activator="{ props }">
          <v-btn
            variant="plain"
            rounded="0"
            class="align-self-center me-4"
            height="100%"
            v-bind="props"
          >
            more
            <v-icon end> mdi-menu-down </v-icon>
          </v-btn>
        </template>

        <v-list class="bg-grey-lighten-3">
          <v-list-item
            v-for="tab in pages.morePages"
            :key="tab.name"
            @click="addItem(tab)"
          >
            <v-icon v-if="tab.icon"> {{ tab.icon }}</v-icon>
            {{ tab.name }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-tabs>

    <v-card-item>
      <v-window v-model="page">
        <v-window-item
          v-for="page in pages.pages.concat(pages.morePages)"
          :key="page.shortName"
          :value="page.shortName"
        >
          <component :is="page.component" />
        </v-window-item>
      </v-window>
    </v-card-item>
  </v-card>
</template>
