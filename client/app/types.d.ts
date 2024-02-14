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
  created_at: string
  body: string
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
  json_content: string
  featured_product_id: number
  title: string
  embed_url: string
  section_type: string
  position: number
  show_title: boolean
  show_filters: boolean
  add_new_products_by_default: boolean
}
