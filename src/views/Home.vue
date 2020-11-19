<template lang="pug">
.home
  header
    h1 Superluminal
    p Superliminal speedrunning

  nav
    router-link(to="/map")
      fa(:icon="['fas', 'map']")
      span Maps

    a(href="https://docs.google.com/document/d/1t1un6AYGTEWPRUZGzZw14ZzDo56x7Bt5WcK1WmAve1U")
      fa(:icon="['fas', 'book']")
      span Guide

    a(href="https://discord.gg/T6JbGSG")
      fa(:icon="['fab', 'discord']")
      span Discord

    a(href="https://www.speedrun.com/superliminal/resources")
      fa(:icon="['fas', 'download']")
      span Resources

</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({})
</script>

<style lang="sass" scoped>
.home
  position: absolute
  right: 0
  bottom: 0
  top: 0
  left: 0
  color: whitesmoke
  background: linear-gradient(#1a3b39, #122825)

  *
    font-family: "Bebas Neue", cursive
    font-weight: normal

header
  text-align: center
  margin-top: 60px

  h1
    color: white
    font-size: 100px

  p
    font-size: 40px

nav
  margin-top: 40px
  display: flex
  flex-direction: column
  align-items: center

  a
    color: white
    border-radius: 5px
    text-align: center
    text-decoration: none
    font-size: 40px
    width: 300px
    padding: 15px
    margin: 15px
    background-color: #2e7a75

    &:hover
      color: #ffff80
      background-color: #409891

    span
      margin-left: 20px

</style>
