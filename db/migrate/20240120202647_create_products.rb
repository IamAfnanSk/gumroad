class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.references :creator, null: false, foreign_key: true
      t.string :currency
      t.string :name
      t.integer :price
      t.text :cover_url
      t.string :permalink
      t.text :description

      t.timestamps
    end
  end
end
