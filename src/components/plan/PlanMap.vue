<script setup lang="ts">
  import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
  import 'leaflet/dist/leaflet.css'
  import { ref } from 'vue'

  const zoom = ref(2)
</script>

<template>
  <div style="height: 80vh; width: 100%">
    <l-map
      ref="mapRef"
      v-model:zoom="zoom"
      :center="[0, 0]"
      :use-global-leaflet="false"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
        no-wrap
      ></l-tile-layer
    ></l-map>
  </div>
</template>
