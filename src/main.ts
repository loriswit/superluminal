import {createApp} from "vue"
import "fontsource-bebas-neue"

import {library} from "@fortawesome/fontawesome-svg-core"
import {fas} from "@fortawesome/free-solid-svg-icons"
import {fab} from "@fortawesome/free-brands-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"

import App from "./App.vue"
import router from "./router"
import "./assets/style/main.sass"

library.add(fas)
library.add(fab)

createApp(App)
  .use(router)
  .component("fa", FontAwesomeIcon)
  .mount("#app")
