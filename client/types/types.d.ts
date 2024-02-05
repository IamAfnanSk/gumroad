export type Post = {
  id: number
  title: string
  body: string
  creator_id: number
  created_at: number
  updated_at: number
}

export type Product = {
  id: number
  name: string
  currency: string
  price: number
  cover_url: string
  permalink: string
  description: string
  created_at: number
  updated_at: number
}

export type Creator = {
  id: number
  username: string
  bio: string
  avatar_url: string
  twitter_handle: string
  created_at: number
  updated_at: number
  name: string
}

export type PageSection = {
  id: number
  creator_id: number
  section_type: 'text' | 'product' | 'featured_product'
  text_json: string
  header: string
  shown_products_json: string
  created_at: number
  updated_at: number
}
