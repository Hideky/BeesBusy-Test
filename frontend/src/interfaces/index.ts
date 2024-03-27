export type LoginPayloadObject = {
  expiry: string
  token: string
  user: {
    username: string
    email: string
    is_staff: boolean
  }
}

export type Profile = {
  city: string
  age: number
  gender: "male" | "female" | "unknown"
}

export type User = {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  profile: Profile
}