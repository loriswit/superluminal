<template lang="pug">
LMarker(:lat-lng="pos")
  LIcon(:icon-url="icon" :icon-size="[48, 48]")
  LTooltip {{ tooltip }}
</template>

<script setup lang="ts">
import {LIcon, LMarker, LTooltip} from "@vue-leaflet/vue-leaflet"
import {LatLngTuple} from "leaflet"

import chessPawn from "../assets/icons/chess-pawn.png"
import cupWithStraw from "../assets/icons/cup-with-straw.png"
import fire from "../assets/icons/fire.png"
import fireExtinguisher from "../assets/icons/fire-extinguisher.png"
import memo from "../assets/icons/memo.png"
import sparkles from "../assets/icons/sparkles.png"

const props = defineProps<{
  type: string
  pos: LatLngTuple
}>()

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
  case "constellation":
    icon = sparkles
    tooltip = "Constellation"
    break
  default:
    throw "Invalid collectible type: " + props.type
}
</script>
