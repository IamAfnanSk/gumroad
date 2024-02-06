class FixCreatorsModel < ActiveRecord::Migration[7.1]
  def change
    change_column :creators, :name, :string, null: true
  end
end
