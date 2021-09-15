<template lang="pug">
p(v-if="!urlDefined") VITE_GUIDE_URL is not set
</template>

<script setup lang="ts">
const url = import.meta.env.VITE_GUIDE_URL
const urlDefined = typeof url === "string"
if (urlDefined)
  location.replace(url)
</script>
