# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Post.create!(title: "My first post", body: "This is the body of my first post", creator_id: 1)
Post.create!(title: "My second post", body: "This is the body of my second post", creator_id: 1)
Post.create!(title: "My third post", body: "This is the body of my third post", creator_id: 1)
Post.create!(title: "My third post", body: "This is the body of my third post", creator_id: 1)

Product.create!(name: "Product 1", creator_id: 1, currency: "USD", price: 100, permalink: "product-1",
                description: "This is product 1")
Product.create!(name: "Product 2", creator_id: 1, currency: "USD", price: 200, permalink: "product-2",
                description: "This is product 2")
Product.create!(name: "Product 3", creator_id: 1, currency: "USD", price: 300, permalink: "product-3",
                description: "This is product 3")
Product.create!(name: "Product 4", creator_id: 1, currency: "USD", price: 400, permalink: "product-4",
                description: "This is product 4")

PageSection.create!(creator_id: 1, position: 1, section_type: 0, title: "Welcome to my site!",
                    json_content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Wow, this editor instance exports its content as JSON."}]}]}')

PageSection.create!(creator_id: 1, position: 2, section_type: 0, title: "Welcome to my site! 2",
                    json_content: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Wow, this editor instance exports its content as JSON."}]}]}')

PageSection.create!(
  creator_id: 1,
  section_type: "product_list",
  title: "My products section",
  position: 3
)

PageSection.create!(
  creator_id: 1,
  section_type: "post_list",
  title: "My posts section"
)
