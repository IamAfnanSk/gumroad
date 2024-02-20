class AddHtmlFieldToPageSections < ActiveRecord::Migration[7.1]
  def change
    add_column :page_sections, :raw_html, :text, null: false, default: ""
  end
end
