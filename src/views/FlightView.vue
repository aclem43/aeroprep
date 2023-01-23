<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'
  import TrackingMap from '@/components/flight.vue/TrackingMap.vue'
  import { onMounted, ref, type Ref } from 'vue'
</script>
<template>
  <AppBar />
  <v-main> <TrackingMap></TrackingMap> </v-main>
</template>

<style></style>
