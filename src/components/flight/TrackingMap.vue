<script setup lang="ts">
  import { ref, computed } from 'vue'

  import 'leaflet/dist/leaflet.css'
  import {
    LMap,
    LTileLayer,
    LPolyline,
    LControlScale, // @ts-expect-error
  } from '@vue-leaflet/vue-leaflet'
  import {
    generateLine,
    type AltitudeLine,
  } from '@/scripts/flight/tracking/map'
  import { getCurrentLineModeRef } from '@/scripts/flight/tracking/trackingConstants'

  const zoom = ref(2)
  const lineMode = getCurrentLineModeRef()
  const center = computed(() => {
    let line = generateLine.value
    const lineMode = getCurrentLineModeRef().value
    if (lineMode == 'basic') {
      line = line as number[][]
      if (line[0] != null) {
        return line[0]
      } else {
        return [0, 0]
      }
    } else {
      line = line as AltitudeLine
      if (line.lines[0] == null) {
        return [0, 0]
      }
      if (line.lines[0].line[0] != null) {
        return line.lines[0].line[0]
      } else {
        return [0, 0]
      }
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
      <div v-if="lineMode == 'basic'">
        <l-polyline :lat-lngs="generateLine" color="#fcba03"></l-polyline>
      </div>
      <div
        v-else
        v-for="(altLine,index) in (generateLine as AltitudeLine).lines"
        v-bind:key="index"
      >
        <l-polyline
          :lat-lngs="altLine.line"
          :color="altLine.color"
        ></l-polyline>
      </div>
      <l-control-scale />
    </l-map>
  </div>
</template>
