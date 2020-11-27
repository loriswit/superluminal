import {createRouter, createWebHistory} from "vue-router"
import Home from "./views/Home.vue"
import Maps from "./views/Maps.vue"
import Guide from "./views/Guide.vue"
import Resources from "./views/Resources.vue"

export default createRouter({
  history: createWebHistory(),
  routes: [
    {path: "/", component: Home},
    {path: "/map", component: Maps},
    {path: "/guide", component: Guide},
    {path: "/resources", component: Resources},
  ]
})
