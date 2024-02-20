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

ActiveRecord::Schema[7.1].define(version: 2024_02_16_145741) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "creators", force: :cascade do |t|
    t.string "bio"
    t.string "twitter_handle"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "username", default: "", null: false
    t.string "name"
    t.index ["email"], name: "index_creators_on_email", unique: true
    t.index ["reset_password_token"], name: "index_creators_on_reset_password_token", unique: true
    t.index ["username"], name: "index_creators_on_username", unique: true
  end

  create_table "page_section_posts", force: :cascade do |t|
    t.bigint "page_section_id", null: false
    t.bigint "post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position"
    t.index ["page_section_id"], name: "index_page_section_posts_on_page_section_id"
    t.index ["post_id"], name: "index_page_section_posts_on_post_id"
  end

  create_table "page_section_products", force: :cascade do |t|
    t.bigint "page_section_id", null: false
    t.bigint "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position"
    t.index ["page_section_id"], name: "index_page_section_products_on_page_section_id"
    t.index ["product_id"], name: "index_page_section_products_on_product_id"
  end

  create_table "page_sections", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "json_content"
    t.integer "featured_product_id"
    t.string "title"
    t.string "embed_url"
    t.integer "section_type", null: false
    t.integer "position"
    t.boolean "show_title"
    t.boolean "show_filters"
    t.boolean "add_new_products_by_default"
    t.string "embed_height"
    t.index ["creator_id"], name: "index_page_sections_on_creator_id"
  end

  create_table "posts", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "body", null: false
    t.string "title", null: false
    t.index ["creator_id"], name: "index_posts_on_creator_id"
  end

  create_table "products", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "currency", null: false
    t.string "name", null: false
    t.integer "price", null: false
    t.string "permalink", null: false
    t.text "description", null: false
    t.index ["creator_id"], name: "index_products_on_creator_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "page_section_posts", "page_sections"
  add_foreign_key "page_section_posts", "posts"
  add_foreign_key "page_section_products", "page_sections"
  add_foreign_key "page_section_products", "products"
  add_foreign_key "page_sections", "creators"
  add_foreign_key "page_sections", "products", column: "featured_product_id"
  add_foreign_key "posts", "creators"
  add_foreign_key "products", "creators"
end
