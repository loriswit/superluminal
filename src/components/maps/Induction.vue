<template lang="pug">
template(v-if="markers")
  collectible(:pos="[6146, 1443]" type="chess-piece")
  collectible(:pos="[1504, 3532]" type="fire-alarm")
  collectible(:pos="[1637, 3406]" type="fire-extinguisher")
  collectible(:pos="[6124, 2300]" type="vending-machine")
  collectible(:pos="[505, 3435]" type="blueprint")
  portal(:pos1="[3959, 1666]" :pos2="[4139, 1969]")
</template>

<script setup lang="ts">
import {LatLngTuple} from "leaflet"
import type {DrawParams} from "../../common/types/draw-image"

import Collectible from "../Collectible.vue"
import Portal from "../Portal.vue"

import image from "../../assets/maps/induction.jpg"

defineProps<{ markers?: boolean }>()
const emit = defineEmits<{ (e: "draw", ...args: DrawParams): void }>()

const size: LatLngTuple = [10334, 3818]
const origin: LatLngTuple = [size[0], 0]
emit("draw", image, size, origin, "black")
</script>
