class CreatePages < ActiveRecord::Migration[7.1]
  def change
    create_table :pages do |t|
      t.references :creator, null: false, foreign_key: true
      t.string :name
      t.string :slug

      t.timestamps
    end
  end
end
