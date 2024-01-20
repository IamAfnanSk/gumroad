class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.references :creator, null: false, foreign_key: true
      t.text :body
      t.string :title

      t.timestamps
    end
  end
end
