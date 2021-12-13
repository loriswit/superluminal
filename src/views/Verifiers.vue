<template lang="pug">
.container
  header
    h1 top verifiers

    select(v-model="statsId")
      option(value="main") Main Categories
      option(value="ce") Category Extensions
      option(value="combined") Combined

    p(v-if="!ready") loading...

    .error(v-if="error")
      p The speedrun.com API returned an error
      p.msg {{ error }}

  table(v-if="ready && !error")
    tr
      th
      th Full runs
      th IL runs
    tr(v-for="stat in currentStats")
      td.player
        a(:class="{mod: stat.moderator}" :href="`https://www.speedrun.com/user/${stat.name}`" target="_blank") {{ stat.name }}
          fa(v-if="stat.moderator" :icon="['fas', 'star']" title="active moderator")
      td.count {{ stat.full }}
      td.count {{ stat.il }}
</template>

<script setup lang="ts">
import axios, {AxiosResponse} from "axios"
import type {Game, Id, Resource, Resources, Run, User} from "../common/types/speedrun"
import {watch} from "vue"

const apiRoot = "https://www.speedrun.com/api/v1"
const mainId = "pd0w3vv1"
const ceId = "kdkmvkq1"

interface Stat {
  name: string
  full: number
  il: number
  moderator: boolean
}

interface Examiner {
  id: Id
  il: boolean
}

let statsData = $ref<Record<string, Stat[]>>({main: [], ce: []})
let loading = $ref<Record<string, boolean>>({main: false, ce: false})
let ready = $computed(() => !Object.values(loading).includes(true))
let statsId = $ref("")

let error = $ref("")


let currentStats = $computed(() => {
  if (statsId === "combined") {
    // clone array
    const combined: Stat[] = statsData.main.map(stat => ({...stat}))
    for (const stat of statsData.ce) {
      const index = combined.findIndex(({name}) => name === stat.name)
      // if already in main game
      if (index >= 0) {
        combined[index].full += stat.full
        combined[index].il += stat.il
        combined[index].moderator ||= stat.moderator
      } else
        combined.push(stat)
    }
    return combined.sort((a, b) => (b.full + b.il) - (a.full + a.il))
  } else
    return statsData[statsId]
})

async function load(id: string) {
  // skip if already loaded
  if (statsData[id].length) return
  loading[id] = true

  const gameId = id === "main" ? mainId : ceId

  try {
    const game: AxiosResponse<Resource<Game>> = await axios.get(`${apiRoot}/games/${gameId}`)
    const moderators = Object.keys(game.data.data.moderators)

    const examiners: Examiner[] = []

    for (const status of ["verified", "rejected"]) {
      let offset = 0
      let hasMore = true
      while (hasMore) {
        const response: AxiosResponse<Resources<Run>> =
          await axios.get(`${apiRoot}/runs?game=${gameId}&max=200&status=${status}&offset=${offset}`)
        examiners.push(...response.data.data.map(r => ({id: r.status.examiner, il: r.level !== null})))
        hasMore = response.data.pagination.links.find(({rel}) => rel == "next") !== undefined
        offset += 200
      }
    }

    const statsMap: Record<Id, Stat> = {}
    for (const examiner of examiners) {
      if (!statsMap[examiner.id]) {
        const response: AxiosResponse<Resource<User>> = await axios.get(apiRoot + "/users/" + examiner.id)
        const name = response.data.data.names.international
        statsMap[examiner.id] = {full: 0, il: 0, name, moderator: moderators.includes(examiner.id)}
      }
      if (examiner.il)
        statsMap[examiner.id].il++
      else
        statsMap[examiner.id].full++
    }

    statsData[id] = Object.values(statsMap).sort((a, b) => (b.full + b.il) - (a.full + a.il))

  } catch (err) {
    if (!axios.isAxiosError(err)) throw err
    error = err.response?.data.message ?? err.message
    if (!error.length) error = err.message
  } finally {
    loading[id] = false
  }
}

watch($$(statsId), async statsId => {
  if (window.location.hash || statsId !== "main")
    window.location.hash = statsId
  if (statsId === "combined")
    await Promise.all([load("main"), load("ce")])
  else
    await load(statsId)
})

// parse URL hash value
const hash = location.hash.substring(1)
if (["main", "ce", "combined"].includes(hash))
  statsId = hash
else {
  location.hash = ""
  statsId = "main"
}
</script>

<style lang="sass" scoped>
.container
  height: 100vh
  overflow-y: scroll
  font-size: 40px
  color: white
  background: linear-gradient(#5a3359, #3b1a3e)

  $scroll-track: rgba(200, 200, 255, 0.1)
  $scroll-thumb: rgba(200, 200, 255, 0.25)
  $scroll-hover: rgba(200, 200, 255, 0.35)

  // webkit
  &::-webkit-scrollbar
    width: 24px

  &::-webkit-scrollbar-track
    background-color: $scroll-track
    background-clip: padding-box
    border: 8px solid transparent
    border-radius: 100px

  &::-webkit-scrollbar-thumb
    background-color: $scroll-thumb
    background-clip: padding-box
    border: 8px solid transparent
    border-radius: 100px

    &:hover
      background-color: $scroll-hover

  // firefox
  scrollbar-width: thin
  scrollbar-color: $scroll-thumb $scroll-track

  *
    font-family: "Bebas Neue", sans-serif
    font-weight: normal

header
  text-align: center
  margin-top: 30px

  h1
    color: #e9dbee
    font-size: 80px

  p
    color: #b888d0

select
  font-size: 24px
  background: rgba(255, 255, 255, 0.1)
  padding: 6px
  margin-bottom: 15px
  color: white
  border: none

  &:hover
    background: rgba(255, 255, 255, 0.15)
    cursor: pointer

  &:focus
    outline: 1px solid rgba(255, 255, 255, 0.25)

  option
    background: #4b284f
    border: none

table
  font-size: 0.7em
  margin: 0 auto 60px
  border-collapse: collapse

tr
  &:nth-child(2n)
    background-color: rgb(255, 255, 255, 0.05)

td, th
  padding: 10px 30px
  white-space: nowrap

th
  font-size: 0.8em
  color: #b888d0

.count
  text-align: center

a
  color: rgba(157, 199, 236, 0.5)
  text-align: center
  text-decoration: none
  width: 300px

  &.mod
    color: #9dc7ec

  &:hover
    text-decoration: underline
    color: #f6f6a0

  .fa-star
    margin-left: 8px
    margin-bottom: 6px
    font-size: 0.5em

@media (max-width: 500px)
  .container
    font-size: 35px

  header
    margin-top: 20px

    h1
      font-size: 60px

  table
    font-size: 0.6em

  a .fa-star
    margin-left: 6px
    margin-bottom: 4px

  td, th
    padding: 10px 10px

</style>
