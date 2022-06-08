/// <reference types="vite/client" />
/// <reference types="vue/ref-macros" />

declare module "*.vue" {
  import type {ComponentOptions} from "vue"
  const Component: ComponentOptions
  export default Component
}

declare module "*.md" {
  import type {ComponentOptions} from "vue"
  const Component: ComponentOptions
  export default Component
}
