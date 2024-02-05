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

# Creator.create!(
#   name: 'Afnan',
#   username: 'iamafnansk',
#   bio: 'Software engineer, selling courses online',
#   avatar_url: 'https://pbs.twimg.com/profile_images/1692545382016802816/ZbQ4NZCc_400x400.jpg',
#   twitter_handle: 'iamafnansk',
# )

# Post.create!(
#   creator_id: 2,
#   title: '2nd Test post',
#   body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a tincidunt velit. Duis at ultricies sapien, non posuere sapien. Nullam finibus magna tincidunt, pharetra quam id, interdum odio. Suspendisse id dapibus enim, a sollicitudin ante. Fusce sed dolor in mi varius lobortis non sit amet libero. Nullam est risus, semper nec laoreet non, scelerisque vitae enim. Donec id viverra augue, quis laoreet quam. Quisque consequat augue nisi, nec pellentesque erat semper ac. Vivamus congue erat in interdum tempor. Duis ornare augue ligula, sed convallis diam tempus et. Sed blandit nulla vitae velit molestie, non pulvinar nulla scelerisque. Suspendisse posuere purus sit amet ante egestas, at laoreet massa facilisis. Pellentesque a erat scelerisque, vehicula magna at, eleifend massa. Integer nulla mauris, bibendum at cursus nec, condimentum eget arcu. Integer at mi luctus, auctor nunc dapibus, ultrices nisi. Integer a feugiat enim.

#   Nunc eu mattis ligula. Donec volutpat, neque in luctus ullamcorper, erat ante pharetra leo, vitae maximus lacus diam a nisl. Phasellus sit amet massa sed lectus vestibulum tincidunt in ac nibh. Ut elementum orci eu metus posuere tempus ac sit amet risus. Vivamus convallis auctor enim. Maecenas eleifend lectus at vestibulum ultrices. Integer et dignissim leo. Maecenas mauris arcu, molestie nec aliquet luctus, fringilla ut metus. Vivamus porttitor quam non lorem pulvinar, sit amet faucibus orci rutrum. Morbi facilisis scelerisque lectus. Nulla eget felis porta, vehicula velit at, venenatis tellus. Donec sodales, augue et mattis malesuada, justo nunc rutrum erat, vel pulvinar diam sem vitae est.

#   Fusce auctor congue ex, ut rutrum sapien molestie quis. Praesent eu lacus ut purus tempus interdum eu sed tortor. Pellentesque quis posuere purus. Morbi aliquet nisl velit, ac auctor turpis finibus non. Integer eu lectus non justo posuere ullamcorper vel in enim. In at tincidunt justo. Maecenas ultricies bibendum egestas. Vivamus tempus accumsan est vel dapibus. Mauris id fermentum lorem. Curabitur lacus leo, feugiat et cursus eget, auctor vitae nunc.

#   Sed rutrum, augue eu blandit efficitur, enim sem sagittis neque, nec blandit augue ligula quis purus. Nunc elit arcu, ultrices et odio in, porttitor egestas elit. Phasellus tincidunt mi ac nunc posuere pulvinar. Duis nec arcu leo. Sed pharetra id lacus in sodales. Sed eu quam sit amet felis lobortis ornare. Nunc faucibus convallis nibh id malesuada. Nunc luctus libero sem, eget semper nisl tincidunt non. Aliquam eget semper nisi, sed pretium magna. Morbi id ipsum nec risus volutpat tristique sed eu mauris. Curabitur tempor magna sed tempus fermentum. Nulla facilisi. Sed tincidunt diam molestie tortor sagittis, nec pellentesque lectus dapibus. Donec felis metus, mattis et ultrices eu, posuere et erat. In hac habitasse platea dictumst.

#   Pellentesque malesuada ornare quam, sit amet tincidunt nunc commodo nec. Morbi eget felis in felis pretium porttitor eu vel sem. Mauris convallis elit ac molestie porta. Aliquam erat volutpat. Donec maximus est non maximus molestie. Cras dignissim, leo euismod dapibus elementum, purus justo pretium ipsum, non tempus sem dui nec nisl. Suspendisse suscipit rhoncus erat id iaculis. Etiam et tellus non urna molestie laoreet at nec leo. Nullam ultricies massa augue, id varius est dignissim sit amet. Phasellus neque libero, vestibulum vitae arcu ut, imperdiet dictum est. Vivamus dapibus convallis viverra. Vivamus sit amet enim lectus. Morbi elementum placerat ipsum, in semper orci venenatis non.',
# )

# Product.create!(
#   cover_url: 'https://static-cse.canva.com/blob/1287846/1600w-wK95f3XNRaM.jpg',
#   name: 'How to create thumbnails again?',
#   creator_id: 2,
#   currency: '₹',
#   price: 20000,
#   permalink: 'fg4g3r',
#   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a tincidunt velit. Duis at ultricies sapien, non posuere sapien. Nullam finibus magna tincidunt, pharetra quam id, interdum odio. Suspendisse id dapibus enim, a sollicitudin ante. Fusce sed dolor in mi varius lobortis non sit amet libero. Nullam est risus, semper nec laoreet non, scelerisque vitae enim. Donec id viverra augue, quis laoreet quam. Quisque consequat augue nisi, nec pellentesque erat semper ac. Vivamus congue erat in interdum tempor. Duis ornare augue ligula, sed convallis diam tempus et. Sed blandit nulla vitae velit molestie, non pulvinar nulla scelerisque. Suspendisse posuere purus sit amet ante egestas, at laoreet massa facilisis. Pellentesque a erat scelerisque, vehicula magna at, eleifend massa. Integer nulla mauris, bibendum at cursus nec, condimentum eget arcu. Integer at mi luctus, auctor nunc dapibus, ultrices nisi. Integer a feugiat enim.

#   Nunc eu mattis ligula. Donec volutpat, neque in luctus ullamcorper, erat ante pharetra leo, vitae maximus lacus diam a nisl. Phasellus sit amet massa sed lectus vestibulum tincidunt in ac nibh. Ut elementum orci eu metus posuere tempus ac sit amet risus. Vivamus convallis auctor enim. Maecenas eleifend lectus at vestibulum ultrices. Integer et dignissim leo. Maecenas mauris arcu, molestie nec aliquet luctus, fringilla ut metus. Vivamus porttitor quam non lorem pulvinar, sit amet faucibus orci rutrum. Morbi facilisis scelerisque lectus. Nulla eget felis porta, vehicula velit at, venenatis tellus. Donec sodales, augue et mattis malesuada, justo nunc rutrum erat, vel pulvinar diam sem vitae est.

#   Fusce auctor congue ex, ut rutrum sapien molestie quis. Praesent eu lacus ut purus tempus interdum eu sed tortor. Pellentesque quis posuere purus. Morbi aliquet nisl velit, ac auctor turpis finibus non. Integer eu lectus non justo posuere ullamcorper vel in enim. In at tincidunt justo. Maecenas ultricies bibendum egestas. Vivamus tempus accumsan est vel dapibus. Mauris id fermentum lorem. Curabitur lacus leo, feugiat et cursus eget, auctor vitae nunc.

#   Sed rutrum, augue eu blandit efficitur, enim sem sagittis neque, nec blandit augue ligula quis purus. Nunc elit arcu, ultrices et odio in, porttitor egestas elit. Phasellus tincidunt mi ac nunc posuere pulvinar. Duis nec arcu leo. Sed pharetra id lacus in sodales. Sed eu quam sit amet felis lobortis ornare. Nunc faucibus convallis nibh id malesuada. Nunc luctus libero sem, eget semper nisl tincidunt non. Aliquam eget semper nisi, sed pretium magna. Morbi id ipsum nec risus volutpat tristique sed eu mauris. Curabitur tempor magna sed tempus fermentum. Nulla facilisi. Sed tincidunt diam molestie tortor sagittis, nec pellentesque lectus dapibus. Donec felis metus, mattis et ultrices eu, posuere et erat. In hac habitasse platea dictumst.

#   Pellentesque malesuada ornare quam, sit amet tincidunt nunc commodo nec. Morbi eget felis in felis pretium porttitor eu vel sem. Mauris convallis elit ac molestie porta. Aliquam erat volutpat. Donec maximus est non maximus molestie. Cras dignissim, leo euismod dapibus elementum, purus justo pretium ipsum, non tempus sem dui nec nisl. Suspendisse suscipit rhoncus erat id iaculis. Etiam et tellus non urna molestie laoreet at nec leo. Nullam ultricies massa augue, id varius est dignissim sit amet. Phasellus neque libero, vestibulum vitae arcu ut, imperdiet dictum est. Vivamus dapibus convallis viverra. Vivamus sit amet enim lectus. Morbi elementum placerat ipsum, in semper orci venenatis non.'
# )

# PageSection.create!(
#   creator_id: 2,
#   section_type: 'product',
#   header: 'My products section',
#   shown_products_json: '[\'2\']',
#   show_filters: false
# )

# create_table "page_sections", force: :cascade do |t|
#   t.bigint "creator_id", null: false
#   t.text "text_json"
#   t.string "header"
#   t.text "shown_products_json"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
#   t.text "section_type"
#   t.boolean "show_filters"
#   t.integer "featured_product_id"
#   t.index ["creator_id"], name: "index_page_sections_on_creator_id"
# end
