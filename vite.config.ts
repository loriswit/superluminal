import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"
import Markdown from "vite-plugin-md"
import MarkdownItAnchor from "markdown-it-anchor"

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      wrapperClasses: "",
      markdownItSetup(md) {
        md.use(MarkdownItAnchor, {
          permalink: MarkdownItAnchor.permalink.headerLink()
        })
      },
    }),
  ],
})
