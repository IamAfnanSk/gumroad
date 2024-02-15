type EntityCommon = {
  created_at: string
  updated_at: string
}

export type Creator = {
  id: string
  email: string
  username: string
  avatar_url: string
  name: string
  bio: string
  twitter_handle: string
} & EntityCommon

export type Product = {
  price: number
  id: number
  name: string
  currency: string
  cover_image_url: string
} & EntityCommon

export type Post = {
  body: string
  id: number
  title: string
} & EntityCommon

export type Section = {
  products: Product[]
  posts: Post[]
  carousel_images: string[]
  id: number
  creator_id: number
  json_content: string
  featured_product_id: number
  title: string
  embed_url: string
  section_type: string
  position: number
  show_title: boolean
  show_filters: boolean
  add_new_products_by_default: boolean
  embed_height: string
} & EntityCommon
