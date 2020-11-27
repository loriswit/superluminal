<template lang="pug">
</template>

<script lang="ts">
import {defineComponent} from "vue"
import type {} from "vite"

export default defineComponent({
  name: "Resources",
  setup() {
    location.href = import.meta.env.VITE_RESOURCES_URL
  }
})
</script>

<style lang="sass" scoped>
iframe
  width: 800px
  height: 600px
</style>
