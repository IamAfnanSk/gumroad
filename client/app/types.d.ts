type EntityCommon = {
  created_at: string
  updated_at: string
}

export type Creator = {
  id: number
  email: string
  username: string
  avatar_url: string
  name: string
  bio: string
  twitter_handle: string
  theme: string
} & EntityCommon

export type Product = {
  price: number
  id: number
  name: string
  currency: string
  cover_image_url: string
  description: string
  creator?: Pick<Creator, 'username' | 'name' | 'avatar_url'>
} & EntityCommon

export type Post = {
  body: string
  id: number
  title: string
} & EntityCommon

export type CarouselImage = {
  id: number
  url: string
}

export type ProfileSection = {
  products: Partial<Product>[]
  posts: Partial<Post>[]
  carousel_images: CarouselImage[]
  id: number
  creator_id: number
  json_content: string
  featured_product_id: number
  title: string
  embed_url: string
  section_type:
    | 'wysiwyg'
    | 'product_list'
    | 'featured_product'
    | 'post_list'
    | 'image_carousel'
    | 'embed'
    | 'subscribe'
    | 'custom_html'
  position: number
  show_title: boolean
  show_filters: boolean
  add_new_products_by_default: boolean
  embed_height: string
  featured_product: Partial<Product>
  raw_html: string
} & EntityCommon

export type NavLink = {
  path: string
  label: string
  activePaths?: string[]
}
