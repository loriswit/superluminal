<template lang="pug">
header
  div
    fa.icon(:icon="['fas', 'map']")
    select(v-model="levelName")
      option induction
      option optical

  button(@click="toggleMarkers")
    fa(:icon="['fas', 'map-marker-alt']")
    span {{ showMarkers ? "Hide " : "Show " }} markers

.container
  LMap#map(
    ref="map"
    :crs="CRS.Simple"
    :min-zoom="-4" :max-zoom="2"
    :zoomAnimation="true"
    :style="{cursor: grab ? 'grab' : 'initial', background}"
    @click="printLocation"
    @mousemove="updateLocation")

    component(:is="level" :markers="showMarkers" @draw="drawImage")
</template>

<script setup lang="ts">
import {provide, watchEffect} from "vue"
import {useRoute, useRouter} from "vue-router"
import {CRS, imageOverlay, ImageOverlay, LatLng, LatLngBoundsLiteral, LatLngTuple, LeafletMouseEvent} from "leaflet"
import {LMap} from "@vue-leaflet/vue-leaflet"
import {MapKey} from "../common/injection-keys"
import "leaflet/dist/leaflet.css"

import Induction from "../components/maps/Induction.vue"
import Optical from "../components/maps/Optical.vue"

const route = useRoute()
const router = useRouter()

const levels = new Map([
  ["induction", Induction],
  ["optical", Optical],
])

let levelName = $ref(route.params.level as string ?? "induction")
let level = $computed(() => levels.get(levelName))

watchEffect(() => router.push(levelName))

let layer = $ref(null as ImageOverlay | null)
let background = $ref("black")

let map = $ref<typeof LMap | null>(null)
provide(MapKey, $$(map))

let pos = $ref(new LatLng(0, 0))

let grab = $ref(true)
addEventListener("keydown", e => {
  if (e.code == "KeyP")
    grab = false
})
addEventListener("keyup", e => {
  if (e.code == "KeyP")
    grab = true
})

let showMarkers = $ref(true)

function updateLocation(event: LeafletMouseEvent) {
  if (event.latlng)
    pos = event.latlng
}

function drawImage(image: string, size: LatLngTuple, origin: LatLngTuple, color: string): void {
  if (!map) return
  const leafletMap = map.leafletObject

  if (layer)
    layer.removeFrom(leafletMap)

  background = color

  const bounds: LatLngBoundsLiteral = [[0, 0], size]
  layer = imageOverlay(image, bounds)
  layer.addTo(leafletMap)

  leafletMap.setView([origin[0] - window.innerHeight, origin[1] - window.innerWidth], -1)
  leafletMap.setMaxBounds([bounds[0].map(x => x - 500), bounds[1].map(x => x + 1000)])
}

function toggleMarkers() {
  showMarkers = !showMarkers
}

function printLocation() {
  if (!grab && pos) {
    console.log(`POS: [${Math.round(pos.lat)}, ${Math.round(pos.lng)}]`)
  }
}
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
