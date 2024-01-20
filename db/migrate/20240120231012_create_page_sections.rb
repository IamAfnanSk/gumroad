class CreatePageSections < ActiveRecord::Migration[7.1]
  def change
    create_table :page_sections do |t|
      t.references :creator, null: false, foreign_key: true
      t.string :type
      t.text :text_json
      t.string :header
      t.text :shown_products_json

      t.timestamps
    end
  end
end
