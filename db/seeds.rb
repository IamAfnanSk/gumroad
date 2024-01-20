# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Creator.create!(
  name: 'Afnan',
  username: 'iamafnansk',
  bio: 'Software engineer, selling courses online',
  avatar_url: 'https://pbs.twimg.com/profile_images/1692545382016802816/ZbQ4NZCc_400x400.jpg',
  twitter_handle: 'iamafnansk'
)
