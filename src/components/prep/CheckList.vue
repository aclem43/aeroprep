<script setup lang="ts">
  import { ref } from 'vue'
  import CheckListItem from './CheckListItem.vue'

  interface CheckListItemType {
    id: number
    title: string
    description: string
    link: string | undefined
  }
  const CheckListItems: CheckListItemType[] = [
    {
      id: 0,
      title: 'IMSAFE',
      description: 'Illnes, Medication, Stress, Alcohol, Fatigue and Eating',
      link: undefined,
    },
    {
      id: 1,
      title: 'Weather',
      description: 'Check the Metar, Taf and BOM',
      link: 'weather',
    },
    {
      id: 2,
      title: 'Risk Assesment',
      description: 'Preform a risk assesment',
      link: undefined,
    },
    {
      id: 3,
      title: 'Preflight',
      description: 'Preform a Preflight',
      link: undefined,
    },
  ]
</script>

<template>
  <v-card title="CheckList" elevation="12">
    <v-list density="comfortable">
      <CheckListItem
        v-for="item in CheckListItems"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :link="item.link"
      ></CheckListItem>
    </v-list>
  </v-card>
</template>
