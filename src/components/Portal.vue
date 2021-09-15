<template lang="pug">
LMarker(v-for="pos in [pos1, pos2]" :lat-lng="pos")
  LIcon(:icon-url="icon" :icon-size="[48, 48]" :icon-anchor="[24, 46]")
  LTooltip Portal
LPolyline(:lat-lngs="[pos1, pos2]")
</template>

<script setup lang="ts">
import {LIcon, LMarker, LPolyline, LTooltip} from "@vue-leaflet/vue-leaflet"
import {LatLngTuple} from "leaflet"

import icon from "../assets/icons/round-pushpin.png"

defineProps<{
  pos1: LatLngTuple
  pos2: LatLngTuple
}>()
</script>
