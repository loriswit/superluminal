<template lang="pug">
.container
  header
    h1 S#[b u]bmitted r#[b u]ns

    p(v-if="!ready") loading...
    p(v-else-if="runs.length")
      template(v-if="hasMore") more than&nbsp;
      | #[b {{ runs.length }}] pending runs
    p(v-else-if="!error") There are no pending runs 🎉

    .error(v-if="error")
      p The speedrun.com API returned an error
      p.msg {{ error }}

  table(v-if="runs.length")
    tr(v-for="run in runs" @click="openRun(run.weblink)")
      td.player
        a(:href="run.players.data[0].weblink" target="_blank" @click.stop) {{ run.players.data[0].names.international }}
      td.category {{ run.level?.data?.name }} {{ run.category.data.name }}
      td.time {{ formatTime(run.times.primary_t) }}
      td.date(:title="formatDate(run.submitted)") {{ daysAgo(run.submitted) }}

  footer
    button(v-if="hasMore" @click="loadMore") Load more

</template>

<script setup lang="ts">
import axios, {AxiosResponse} from "axios"
import type {Run, RunsData} from "../common/types/speedrun"

const apiRoot = "https://www.speedrun.com/api/v1"
const uri = "/runs?game=pd0w3vv1&status=new&orderby=submitted&embed=players,category,level"

let runs = $ref(new Array<Run>())

function formatTime(time: number) {
  return (Math.floor(time / 3600) + ":" + new Date(time * 1000).toISOString().substr(14, 8))
    .replace(/^(0+:?)+/, "") // remove leading zeros
}

function formatDate(date: string) {
  return new Date(date).toLocaleString()
}

function daysAgo(date: string) {
  const days = Math.floor((new Date().getTime() - new Date(date).getTime()) / 86400000)
  if (days == 0)
    return "Today"
  if (days == 1)
    return "1 day ago"
  return days + " days ago"
}

function openRun(url: string) {
  window.open(url, "_blank")?.focus()
}

let hasMore = $ref(false)
let ready = $ref(false)
let error = $ref("")

let offset = 0

async function loadMore() {
  const max = 50
  try {
    const response: AxiosResponse<RunsData> = await axios.get(`${apiRoot + uri}&max=${max}&offset=${offset}`)
    hasMore = response.data.pagination.links.find(({rel}) => rel === "next") !== undefined
    runs.push(...response.data.data)
    offset += max
  } catch (err) {
    if (!axios.isAxiosError(err)) throw err
    error = err.response?.data.message ?? err.message
    if (!error.length) error = err.message
  } finally {
    ready = true
  }
}

loadMore()
</script>

<style lang="sass" scoped>
.container
  min-height: 100vh
  overflow: auto
  font-size: 40px
  color: white
  background: linear-gradient(#224053, #121e28)

  *
    font-family: "Bebas Neue", sans-serif
    font-weight: normal

header
  text-align: center
  margin-top: 30px

  h1
    color: #dbe6ee
    font-size: 80px

    b
      color: #82b8d6

  p
    color: #709aba
    margin-bottom: 15px

    b
      color: #a7c8de

table
  font-size: 0.7em
  margin: 0 auto 60px
  border-collapse: collapse

tr
  cursor: pointer

  &:nth-child(2n-1)
    background-color: rgb(255, 255, 255, 0.05)

  &:hover
    background-color: rgb(0, 0, 50, 0.2)

td
  padding: 10px 30px
  white-space: nowrap

.time
  text-align: right

.category, .date
  text-align: center

a
  color: #9dc7ec
  text-align: center
  text-decoration: none
  width: 300px

  &:hover
    text-decoration: underline
    color: #f6f6a0

footer
  text-align: center
  margin: 20px

button
  cursor: pointer
  font-size: 0.8em
  border: none
  outline: none
  color: white
  border-radius: 5px
  width: 200px
  padding: 12px
  margin: 15px
  background-color: #2e597a

  &:hover
    color: #dff6a0
    background-color: #407598

@media (max-width: 500px)
  .container
    font-size: 35px

  header
    margin-top: 20px

    h1
      font-size: 60px

  table
    font-size: 0.6em

  td
    padding: 10px 10px

</style>
