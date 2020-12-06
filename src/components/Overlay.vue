<template lang="pug">
l-marker(:lat-lng="pos" @click="shown = !shown")
  l-icon(:icon-url="icon" :icon-size="[48, 48]")
  l-tooltip {{ (shown ? "Hide " : "Show ") + name }}
</template>

<script lang="ts">
import {defineComponent, inject, ref, watchEffect} from "vue"
import {LIcon, LMarker, LTooltip} from "@vue-leaflet/vue-leaflet"

import icon from "../assets/icons/eye.png"

export default defineComponent({
  components: {LMarker, LIcon, LTooltip},
  props: {
    name: {type: String, required: true},
    pos: {type: Array, required: true},
    overlay: {type: String, required: true},
    bounds: {type: Array, required: true},
  },
  setup(props) {
    const Leaflet = window.L
    const layer = Leaflet.imageOverlay(props.overlay, props.bounds)
    const shown = ref(false)

    const map = inject("map")

    watchEffect(() => {
      if (shown.value)
        layer.addTo(map.value.leafletObject)
      else
        layer.removeFrom(map.value.leafletObject)
    })

    return {icon, layer, shown}
  }
})
</script>
