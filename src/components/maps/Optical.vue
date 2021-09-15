<template lang="pug">
overlay(:pos="[1598, 11296]" name="roof" :overlay="overlay" :bounds="[[1744, 10732], [252, 14447]]")
template(v-if="markers")
  collectible(:pos="[5181, 8850]" type="chess-piece")
  collectible(:pos="[5480, 9621]" type="chess-piece")
  collectible(:pos="[11002, 1200]" type="fire-alarm")
  collectible(:pos="[11854, 3151]" type="fire-alarm")
  collectible(:pos="[12939, 3404]" type="fire-alarm")
  collectible(:pos="[13140, 3944]" type="fire-alarm")
  collectible(:pos="[12121, 4024]" type="fire-alarm")
  collectible(:pos="[11863, 5163]" type="fire-alarm")
  collectible(:pos="[11215, 5329]" type="fire-alarm")
  collectible(:pos="[7338, 5139]" type="fire-alarm")
  collectible(:pos="[6282, 4445]" type="fire-alarm")
  collectible(:pos="[5892, 5237]" type="fire-alarm")
  collectible(:pos="[5671, 4272]" type="fire-alarm")
  collectible(:pos="[5110, 6969]" type="fire-alarm")
  collectible(:pos="[6441, 10966]" type="fire-alarm")
  collectible(:pos="[921, 11935]" type="fire-alarm")
  collectible(:pos="[1399, 12967]" type="fire-alarm")
  collectible(:pos="[545, 12961]" type="fire-alarm")
  collectible(:pos="[752, 16616]" type="fire-alarm")
  collectible(:pos="[10995, 1170]" type="fire-extinguisher")
  collectible(:pos="[11856, 3330]" type="fire-extinguisher")
  collectible(:pos="[12938, 3427]" type="fire-extinguisher")
  collectible(:pos="[12235, 4221]" type="fire-extinguisher")
  collectible(:pos="[11210, 5109]" type="fire-extinguisher")
  collectible(:pos="[9736, 5051]" type="fire-extinguisher")
  collectible(:pos="[7307, 5139]" type="fire-extinguisher")
  collectible(:pos="[6639, 4933]" type="fire-extinguisher")
  collectible(:pos="[5384, 4945]" type="fire-extinguisher")
  collectible(:pos="[5464, 6968]" type="fire-extinguisher")
  collectible(:pos="[6568, 11164]" type="fire-extinguisher")
  collectible(:pos="[1037, 11097]" type="fire-extinguisher")
  collectible(:pos="[1112, 13855]" type="fire-extinguisher")
  collectible(:pos="[2185, 16597]" type="fire-extinguisher")
  collectible(:pos="[11162, 2011]" type="vending-machine")
  collectible(:pos="[10796, 4459]" type="blueprint")
  collectible(:pos="[1253, 11772]" type="blueprint")
  collectible(:pos="[1278, 8475]" type="constellation")
  achievement(:pos="[6507, 11640]" name="Please use other door")
  portal(:pos1="[809, 15583]" :pos2="[750, 16679]")
</template>

<script setup lang="ts">
import {LatLngTuple} from "leaflet"
import type {DrawImage} from "../../views/Maps.vue"

import Collectible from "../Collectible.vue"
import Portal from "../Portal.vue"
import Achievement from "../Achievement.vue"
import Overlay from "../Overlay.vue"

import image from "../../assets/maps/optical.jpg"
import overlay from "../../assets/maps/optical_overlay.jpg"

defineProps<{ markers?: boolean }>()
const emit = defineEmits<{ (e: "draw", ...args: Parameters<DrawImage>): void }>()

const size: LatLngTuple = [13862, 16934]
const origin: LatLngTuple = [11250, 0]
emit("draw", image, size, origin, "#040c19")
</script>
