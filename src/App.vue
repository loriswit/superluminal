<template lang="pug">
router-view(v-slot="{ Component }")
  suspense
      component(:is="Component")
</template>
