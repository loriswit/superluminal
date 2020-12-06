import {createRouter, createWebHistory} from "vue-router"
import Home from "./views/Home.vue"
import Maps from "./views/Maps.vue"
import Guide from "./views/Guide.vue"
import Resources from "./views/Resources.vue"
import Submissions from "./views/Submissions.vue"
import Verifiers from "./views/Verifiers.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: "/", component: Home},
    {path: "/map", redirect: "/map/induction"},
    {path: "/map/:level", component: Maps, meta: {title: "Maps"}},
    {path: "/guide", component: Guide, meta: {title: "Guide"}},
    {path: "/resources", component: Resources, meta: {title: "Resources"}},
    {path: "/submissions", component: Submissions, meta: {title: "Submissions"}},
    {path: "/verifiers", component: Verifiers, meta: {title: "Verifiers"}},
  ]
})

router.afterEach((to) => {
  if(!to.meta.title)
    document.title = "Superluminal"
  else
    document.title = to.meta.title + " - Superluminal"
})

export default router
