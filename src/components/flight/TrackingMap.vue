<script setup lang="ts">
  import type { Flight } from '@/models/Flight'
  import { ref } from 'vue'

  import 'leaflet/dist/leaflet.css'
  import {
    LMap,
    LTileLayer,
    LPolyline,
    LControlScale,
  } from '@vue-leaflet/vue-leaflet'
  import { generateLine } from '@/scripts/flight/tracking/map'

  const zoom = ref(2)
</script>

<template>
  <div style="height: 100%; width: 100%">
    <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-polyline :lat-lngs="generateLine" color="green"></l-polyline>
      <l-control-scale></l-control-scale>
    </l-map>
  </div>
</template>
