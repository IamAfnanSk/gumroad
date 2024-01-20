# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_20_231012) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "creators", force: :cascade do |t|
    t.string "username"
    t.string "bio"
    t.text "avatar_url"
    t.string "twitter_handle"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
  end

  create_table "page_sections", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.string "type"
    t.text "text_json"
    t.string "header"
    t.text "shown_products_json"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_page_sections_on_creator_id"
  end

  create_table "pages", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.string "name"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_pages_on_creator_id"
  end

  create_table "posts", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.text "body"
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_posts_on_creator_id"
  end

  create_table "products", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.string "currency"
    t.string "name"
    t.integer "price"
    t.text "cover_url"
    t.string "permalink"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_products_on_creator_id"
  end

  add_foreign_key "page_sections", "creators"
  add_foreign_key "pages", "creators"
  add_foreign_key "posts", "creators"
  add_foreign_key "products", "creators"
end
