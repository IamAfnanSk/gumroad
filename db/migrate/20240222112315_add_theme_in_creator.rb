class AddThemeInCreator < ActiveRecord::Migration[7.1]
  def change
    add_column :creators, :theme, :string
  end
end
