import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId | string
  name: string
  email: string
  password: string
  role: "admin" | "user"
  createdAt: Date
}

export interface UserForm {
  name: string
  email: string
  password: string
  confirmPassword?: string
}

