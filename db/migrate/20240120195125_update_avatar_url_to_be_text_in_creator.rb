class UpdateAvatarUrlToBeTextInCreator < ActiveRecord::Migration[7.1]
  def change
    change_column :creators, :avatar_url, :text
  end
end
