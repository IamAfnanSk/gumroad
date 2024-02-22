class FixForeignKeyOfSectionPostsAndProducts < ActiveRecord::Migration[7.1]
  def up
    remove_foreign_key :page_section_products, :products
    remove_foreign_key :page_section_posts, :posts
    add_foreign_key :page_section_products, :products, on_delete: :cascade
    add_foreign_key :page_section_posts, :posts, on_delete: :cascade
  end

  def down
    remove_foreign_key :page_section_products, :products
    add_foreign_key :page_section_products, :products

    remove_foreign_key :page_section_posts, :posts
    add_foreign_key :page_section_posts, :posts
  end
end
