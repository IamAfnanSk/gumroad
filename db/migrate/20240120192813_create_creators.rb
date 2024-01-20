class CreateCreators < ActiveRecord::Migration[7.1]
  def change
    create_table :creators do |t|
      t.string :username
      t.string :name
      t.string :bio
      t.string :avatar_url
      t.string :twitter_handle

      t.timestamps
    end
  end
end
