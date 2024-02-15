class AddEmbedHeightToPageSections < ActiveRecord::Migration[7.1]
  def change
    add_column :page_sections, :embed_height, :string
  end
end
