import {LatLngTuple} from "leaflet"

export type DrawImage = (image: string, size: LatLngTuple, origin: LatLngTuple, color: string) => void
export type DrawParams = Parameters<DrawImage>
