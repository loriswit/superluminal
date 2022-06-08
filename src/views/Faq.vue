<template lang="pug">
.faq
  h1 FAQ
  faq.content
  footer
    a.edit(href="https://github.com/loriswit/superluminal/edit/main/src/assets/docs/faq.md" target="_blank")
      fa(:icon="['fas', 'pen']")
      span Edit FAQ

</template>

<script setup lang="ts">
import Faq from "../assets/docs/faq.md"</script>

<style lang="sass" scoped>
.faq
  min-height: 100vh
  padding: 20px 20px 150px
  overflow: auto
  color: white
  background: linear-gradient(#2d5165, #1e3a4f)
  font-size: 18px
  font-weight: normal

h1
  font-family: "Bebas Neue", sans-serif
  text-align: center
  font-size: 4em
  font-weight: normal

.content
  max-width: 750px
  margin: auto

:deep(.content)
  p
    margin-bottom: 16px

  h1, h2, h3, h4, h5, h6
    font-weight: normal
    margin-top: 32px
    margin-bottom: 10px
    line-height: 0.9em

    *
      font-family: "Bebas Neue", sans-serif

  h1
    font-size: 2.2em

  h2
    font-size: 1.8em

  h3
    font-size: 1.6em

  h4
    font-size: 1.4em

  h5
    font-size: 1.2em

  h6
    font-size: 1em

  a
    text-decoration: none
    color: rgba(220, 230, 255, 0.7)

    &:hover
      text-decoration: underline
      color: rgba(220, 230, 255, 0.85)

  ul, ol
    padding-left: 1em

footer
  margin-top: 60px
  margin-bottom: 30px
  text-align: center

.edit
  background-color: #4892b2
  color: white
  text-decoration: none
  padding: 10px 16px
  border-radius: 5px
  display: inline-flex
  align-items: center

  span
    font-family: "Bebas Neue", sans-serif
    font-size: 24px
    margin-left: 10px

  &:hover
    background-color: #62b0d2
</style>
