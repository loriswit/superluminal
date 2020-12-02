<template lang="pug">
.container
  l-map#map(
    ref="map" @ready="onMapReady"
    :crs="Leaflet.CRS.Simple"
    :min-zoom="-3" :max-zoom="2"
    :zoomAnimation="true")

    collectible(:pos="[6146, 1443]" type="chess-piece")
    collectible(:pos="[1504, 3532]" type="fire-alarm")
    collectible(:pos="[1637, 3406]" type="fire-extinguisher")
    collectible(:pos="[6124, 2300]" type="vending-machine")
    collectible(:pos="[505, 3435]" type="blueprint")
    portal(:pos1="[3959, 1666]" :pos2="[4139, 1969]")
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {LMap} from "@vue-leaflet/vue-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet"

import Collectible from "../components/Collectible.vue"
import Portal from "../components/Portal.vue"

export default defineComponent({
  components: {LMap, Collectible, Portal},
  setup() {
    return {Leaflet: window.L}
  },
  methods: {
    async onMapReady() {
      const map = this.$refs.map.leafletObject

      const bounds = [[0, 0], [10334, 3818]]
      const image = await import("../assets/maps/induction.jpg")
      this.Leaflet.imageOverlay(image.default, bounds).addTo(map)

      map.setView([bounds[1][0] - window.innerHeight, window.innerWidth], -1)
      map.setMaxBounds([bounds[0].map(x => x - 500), bounds[1].map(x => x + 1000)])
    }
  }
})
</script>

<style lang="sass" scoped>
.container
  height: 100vh
  width: 100vw

#map
  background: black
</style>
