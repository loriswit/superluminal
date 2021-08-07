<template lang="pug">
.container
  header
    h1 top verifiers

    p(v-if="!ready") loading...

    .error(v-if="error")
      p The speedrun.com API returned an error
      p.msg {{ error }}

  table(v-if="ready && !error")
    tr
      th
      th Full runs
      th IL runs
    tr(v-for="stat in stats")
      td.player
        a(:href="`https://www.speedrun.com/user/${stat.name}`" target="_blank") {{ stat.name }}
      td.count {{ stat.full }}
      td.count {{ stat.il }}
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue"
import axios from "axios"

export default defineComponent({
  name: "Home",
  setup() {
    const apiRoot = "https://www.speedrun.com/api/v1"
    const uri = "/runs?game=pd0w3vv1&max=200"

    let sortedStats = reactive([])
    let ready = ref(false)
    let error = ref("")

    const load = async () => {
      const examiners = []
      try {
        for (const status of ["verified", "rejected"]) {
          let offset = 0
          let hasMore = true
          while (hasMore) {
            const response = await axios.get(`${apiRoot + uri}&status=${status}&offset=${offset}`)
            examiners.push(...response.data.data.map(r => ({id: r.status.examiner, il: r.level !== null})))
            hasMore = response.data.pagination.links.find(({rel}) => rel == "next") !== undefined
            offset += 200
          }
        }

        const stats = {}
        for (const e of examiners) {
          if (!stats[e.id]) {
            const name = (await axios.get(apiRoot + "/users/" + e.id)).data.data.names.international
            stats[e.id] = {full: 0, il: 0, name}
          }
          if (e.il)
            stats[e.id].il++
          else
            stats[e.id].full++
        }

        sortedStats.push(...Object.values(stats).sort((a, b) => (b.full + b.il) - (a.full + a.il)))
      } catch (err) {
        error.value = err.response?.data.message ?? err.message
      } finally {
        ready.value = true
      }
    }

    load()

    return {stats: sortedStats, ready, error}
  }
})
</script>

<style lang="sass" scoped>
.container
  min-height: 100vh
  overflow: auto
  font-size: 40px
  color: white
  background: linear-gradient(#5a3359, #3b1a3e)

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
  color: #9dc7ec
  text-align: center
  text-decoration: none
  width: 300px

  &:hover
    text-decoration: underline
    color: #f6f6a0

@media (max-width: 500px)
  .container
    font-size: 35px

  header
    margin-top: 20px

    h1
      font-size: 60px

  table
    font-size: 0.6em

  td, th
    padding: 10px 10px

</style>
