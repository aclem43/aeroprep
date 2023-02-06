<script setup lang="ts">
  import type { Flight } from '@/models/Flight'
  import { computed, ref } from 'vue'

  import 'leaflet/dist/leaflet.css'
  import { LMap, LTileLayer, LPolyline } from '@vue-leaflet/vue-leaflet'

  const props = defineProps<{ flight: Flight | null }>()
  const zoom = ref(2)
  const generateLineFromFlight = computed(() => {
    const testLine = [[-27.502808641996534, 152.9606629798137]]
    if (props.flight == null) {
      return testLine
    }
    const line: number[][] = []
    props.flight.flightPath.forEach((d) => {
      line.push([d.cord.longitude * 100000, d.cord.lattitude * 10000])
    })
    return testLine
  })
</script>

<template>
  <div style="height: 100%; width: 100%">
    <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-polyline :lat-lngs="generateLineFromFlight" color="green"></l-polyline>
    </l-map>
  </div>
</template>
