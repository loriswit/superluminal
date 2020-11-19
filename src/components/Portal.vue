<template lang="pug">
l-marker(v-for="pos in [pos1, pos2]" :lat-lng="pos")
  l-icon(:icon-url="icon" :icon-size="[48, 48]" :icon-anchor="[24, 46]")
  l-tooltip Portal
l-polyline(:lat-lngs="[pos1, pos2]")
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {LIcon, LMarker, LPolyline, LTooltip} from "@vue-leaflet/vue-leaflet"

import roundPushpin from "../assets/icons/round-pushpin.png"

export default defineComponent({
  components: {LMarker, LIcon, LTooltip, LPolyline},
  props: {
    pos1: {type: Array, required: true},
    pos2: {type: Array, required: true}
  },
  setup() {
    return {icon: roundPushpin}
  }
})
</script>
