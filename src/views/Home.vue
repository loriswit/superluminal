<template lang="pug">
.home
  header
    h1 Superl#[b u]minal
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
  min-height: 100vh
  overflow: auto
  font-size: 40px
  color: white
  background: linear-gradient(#1a3b39, #122825)

  *
    font-family: "Bebas Neue", sans-serif
    font-weight: normal

header
  text-align: center
  margin-top: 60px

  h1
    color: #dbeee8
    font-size: 100px

    b
      color: #70baab

nav
  margin: 40px 0
  display: flex
  flex-direction: column
  align-items: center

  a
    color: white
    border-radius: 5px
    text-align: center
    text-decoration: none
    width: 300px
    padding: 15px
    margin: 15px
    background-color: #2e7a75

    &:hover
      color: #f6f6a0
      background-color: #409891

    span
      margin-left: 20px

@media (max-width: 500px)
  .home
    font-size: 35px

  header
    margin-top: 30px

    h1
      font-size: 70px

</style>
