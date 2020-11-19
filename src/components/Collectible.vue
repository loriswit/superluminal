<template lang="pug">
l-marker(:lat-lng="pos")
  l-icon(:icon-url="icon" :icon-size="[48, 48]")
  l-tooltip {{ tooltip }}
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {LIcon, LMarker, LTooltip} from "@vue-leaflet/vue-leaflet"

import chessPawn from "../assets/icons/chess-pawn.png"
import cupWithStraw from "../assets/icons/cup-with-straw.png"
import fire from "../assets/icons/fire.png"
import fireExtinguisher from "../assets/icons/fire-extinguisher.png"
import memo from "../assets/icons/memo.png"

export default defineComponent({
  components: {LMarker, LIcon, LTooltip},
  props: {type: String, pos: Array},
  setup(props) {
    let icon = ""
    let tooltip = ""

    switch (props.type) {
      case "chess-piece":
        icon = chessPawn
        tooltip = "Chess piece"
        break
      case "fire-alarm":
        icon = fire
        tooltip = "Fire alarm"
        break
      case "vending-machine":
        icon = cupWithStraw
        tooltip = "Vending machine"
        break
      case "fire-extinguisher":
        icon = fireExtinguisher
        tooltip = "Fire extinguisher"
        break
      case "blueprint":
        icon = memo
        tooltip = "Blueprint"
        break
      default:
        throw "Invalid collectible type: " + props.type
    }

    return {icon, tooltip}
  }
})
</script>
