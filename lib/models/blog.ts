import type { ObjectId } from "mongodb"

export interface BlogPost {
  _id?: ObjectId | string
  title: string
  content: string
  excerpt: string
  coverImage?: string
  author: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  published: boolean
}

export interface BlogPostForm {
  title: string
  content: string
  excerpt: string
  coverImage?: string
  tags: string
  published: boolean
}

