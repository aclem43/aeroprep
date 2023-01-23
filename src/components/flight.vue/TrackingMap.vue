<script setup lang="ts">
  import { ref } from 'vue'
  const view = ref()
  const center = ref([40, 40])
  const projection = ref('EPSG:3857')

  const zoom = ref(0)
  const rotation = ref(0)
</script>

<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 400px"
  >
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
  </ol-map>
</template>
