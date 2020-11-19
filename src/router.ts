import {createRouter, createWebHistory} from "vue-router"
import Home from "./views/Home.vue"
import Maps from "./views/Maps.vue"

export default createRouter({
  history: createWebHistory(),
  routes: [
    {path: "/", component: Home},
    {path: "/map", component: Maps},
  ]
})
