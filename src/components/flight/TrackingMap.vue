<script setup lang="ts">
  import { ref, computed } from 'vue'

  import 'leaflet/dist/leaflet.css'
  import {
    LMap,
    LTileLayer,
    LPolyline,
    LControlScale,
  } from '@vue-leaflet/vue-leaflet'
  import { generateLine } from '@/scripts/flight/tracking/map'

  const zoom = ref(2)
  const center = computed(() => {
    if (generateLine.value.length == 0) {
      return [0, 0]
    } else {
      return generateLine.value[0]
    }
  })
  const mapRef = ref()
</script>

<template>
  <div style="height: 100%; width: 100%">
    <l-map ref="mapRef" v-model:zoom="zoom" :center="center">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-polyline :lat-lngs="generateLine" color="green"></l-polyline>
      <l-control-scale />
    </l-map>
  </div>
</template>
