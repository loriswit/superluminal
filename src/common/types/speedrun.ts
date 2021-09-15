export interface User {
  weblink: string
  names: { international: string }
}

export interface UserData {
  data: User
}

export interface Run {
  weblink: string
  level: { data?: { name: string } } | null
  category: { data: { name: string } }
  status: { examiner: string }
  players: { data: User[] }
  submitted: string
  times: { primary_t: number }
  system: { platform: string }
}

export interface Link {
  rel: string
  uri: string
}

export interface RunsData {
  data: Run[]
  pagination: { links: Link[] }
}
