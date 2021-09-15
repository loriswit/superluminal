<template lang="pug">
LMarker(:lat-lng="pos")
  LIcon(:icon-url="icon" :icon-size="[48, 48]")
  LTooltip {{ name }}
</template>

<script setup lang="ts">
import {LIcon, LMarker, LTooltip} from "@vue-leaflet/vue-leaflet"
import {LatLngTuple} from "leaflet"

import icon from "../assets/icons/trophy.png"

defineProps<{
  name: string
  pos: LatLngTuple
}>()
</script>
