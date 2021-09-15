import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [
    // refTransform doesn't work for now, see https://github.com/vuejs/vue-next/issues/4502
    vue({script: {refSugar: true}}),
  ],
})
