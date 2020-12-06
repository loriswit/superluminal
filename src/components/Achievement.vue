<template lang="pug">
l-marker(:lat-lng="pos")
  l-icon(:icon-url="icon" :icon-size="[48, 48]")
  l-tooltip {{ name }}
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {LIcon, LMarker, LPolyline, LTooltip} from "@vue-leaflet/vue-leaflet"

import trophy from "../assets/icons/trophy.png"

export default defineComponent({
  components: {LMarker, LIcon, LTooltip, LPolyline},
  props: {
    name: {type: String, required: true},
    pos: {type: Array, required: true}
  },
  setup() {
    return {icon: trophy}
  }
})
</script>
