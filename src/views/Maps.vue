<template lang="pug">
header
  div
    fa.icon(:icon="['fas', 'map']")
    select(v-model="level")
      option induction
      option optical

  button(@click="toggleMarkers")
    fa(:icon="['fas', 'map-marker-alt']")
    span {{ showMarkers ? "Hide " : "Show " }} markers

.container
  l-map#map(
    ref="map"
    :crs="Leaflet.CRS.Simple"
    :min-zoom="-4" :max-zoom="2"
    :zoomAnimation="true"
    :style="{cursor: grab ? 'grab' : 'initial', background: color}"
    @click="printLocation"
    @mousemove="updateLocation")

    component(:is="level" :markers="showMarkers" @draw="drawImage")
</template>

<script lang="ts">
import {defineComponent, provide, ref, watchEffect} from "vue"
import {useRoute, useRouter} from "vue-router"
import {LMap, LMarker, LTooltip} from "@vue-leaflet/vue-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet"

import Induction from "../components/maps/Induction.vue"
import Optical from "../components/maps/Optical.vue"

export default defineComponent({
  components: {LMap, LMarker, LTooltip, Induction, Optical},
  setup() {
    const route = useRoute()
    const router = useRouter()

    const level = ref(route.params.level ?? "induction")

    watchEffect(() => {
      router.push(level.value)
    })

    const layer = ref(null)
    const color = ref("black")

    const map = ref(null)
    provide("map", map)

    const pos = ref(null)

    const grab = ref(true)
    addEventListener("keydown", e => {
      if (e.code == "KeyP")
        grab.value = false
    })
    addEventListener("keyup", e => {
      if (e.code == "KeyP")
        grab.value = true
    })

    const showMarkers = ref(true)

    return {
      Leaflet: window.L,
      level, layer, color,
      map, pos, grab, showMarkers
    }
  },
  methods: {
    updateLocation(event) {
      if (event.latlng)
        this.pos = event.latlng
    },
    drawImage(image, size, origin, color) {
      const map = this.map.leafletObject

      if (this.layer)
        this.layer.removeFrom(map)

      this.color = color

      const bounds = [[0, 0], size]
      this.layer = this.Leaflet.imageOverlay(image, bounds)
      this.layer.addTo(map)

      map.setView([origin[0] - window.innerHeight, origin[1] - window.innerWidth], -1)
      map.setMaxBounds([bounds[0].map(x => x - 500), bounds[1].map(x => x + 1000)])
    },
    toggleMarkers() {
      this.showMarkers = !this.showMarkers
    },
    printLocation() {
      if (!this.grab && this.pos) {
        console.log(`POS: [${Math.round(this.pos.lat)}, ${Math.round(this.pos.lng)}]`)
      }
    }
  }
})
</script>

<style lang="sass" scoped>
.container
  height: calc(100vh - 50px)
  width: 100vw

header, select, button
  color: #eae2ac
  background-color: #2b433e

header
  display: flex
  justify-content: space-between
  border-bottom: 2px solid #eae2ac
  height: 50px

  .icon
    margin: 0 12px

  button, select
    font-family: "Bebas Neue", sans-serif
    font-size: 1.5em
    cursor: pointer
    border: none
    text-transform: uppercase
    padding: 8px 12px
    border-radius: 0
    outline: none
    height: 100%

    option
      font-family: "Bebas Neue", sans-serif

    &:hover
      background-color: #606e60

  button
    width: 180px

    span
      margin-left: 12px
      font-family: "Bebas Neue", sans-serif

</style>
