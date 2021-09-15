import {InjectionKey, Ref} from "vue"
import {LMap} from "@vue-leaflet/vue-leaflet"

export const MapKey: InjectionKey<Ref<typeof LMap | null>> = Symbol("map")
