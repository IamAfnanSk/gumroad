export type Creator = {
  id: string
  email: string
  username: string
  avatarUrl: string
  name: string
  bio: string
  twitter_handle: string
}

export type Product = {
  id: number
  name: string
}

export type Post = {
  id: number
  title: string
}

export type Section = {
  products: Product[]
  posts: Post[]
  carousel_images: string[]
  id: number
  creator_id: number
  created_at: string
  updated_at: string
  json_content: string | null
  featured_product_id: number | null
  title: string
  embed_url: string | null
  section_type: string
  position: number
}
