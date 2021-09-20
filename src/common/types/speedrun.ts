export type Id = string

export type Uri = `https://www.speedrun.com/${string}`

export interface User {
  weblink: Uri
  names: { international: string }
}

export interface Run {
  weblink: string
  level: { data?: { name: string } } | null
  category: { data: { name: string } }
  status: { examiner: Id }
  players: Resources<User>
  submitted: string
  times: { primary_t: number }
  system: { platform: string }
}

export interface Link {
  rel: string
  uri: Uri
}

export type ModLevel = "moderator" | "super-moderator"

export interface Game {
  moderators: Record<Id, ModLevel>
}

export interface Resource<T> {
  data: T
}

export interface Resources<T> {
  data: T[]
  pagination: { links: Link[] }
}
