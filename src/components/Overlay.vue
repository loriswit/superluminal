<template lang="pug">
LMarker(:lat-lng="pos" @click="shown = !shown")
  LIcon(:icon-url="icon" :icon-size="[48, 48]")
  LTooltip {{ (shown ? "Hide " : "Show ") + name }}
</template>

<script setup lang="ts">
import {inject, watchEffect} from "vue"
import {LIcon, LMarker, LTooltip} from "@vue-leaflet/vue-leaflet"
import {imageOverlay, LatLngBoundsExpression, LatLngTuple} from "leaflet"

import icon from "../assets/icons/eye.png"
import {MapKey} from "../common/injection-keys"

const props = defineProps<{
  name: string,
  pos: LatLngTuple,
  overlay: string
  bounds: LatLngBoundsExpression
}>()

const layer = imageOverlay(props.overlay, props.bounds)
let shown = $ref(false)

const mapRef = inject(MapKey)
if (!mapRef) throw "map is not provided"

let map = $(mapRef)

watchEffect(() => {
  if (map)
    if (shown)
      layer.addTo(map.leafletObject)
    else
      layer.removeFrom(map.leafletObject)
})
</script>
