class FixForeignKeyOfPageSection < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :page_sections, column: :featured_product_id
    add_foreign_key :page_sections, :products, column: :featured_product_id, on_delete: :nullify
  end
end
