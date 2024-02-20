class ChangeDefaultsOfPageSection < ActiveRecord::Migration[7.1]
  def change
    def change
      change_column_default :page_sections, :json_content, {}
      change_column_default :page_sections, :title, ""
      change_column_default :page_sections, :embed_url, ""
      change_column_default :page_sections, :show_title, true
      change_column_default :page_sections, :show_filters, false
      change_column_default :page_sections, :add_new_products_by_default, false
      change_column_default :page_sections, :embed_height, "400px"
    end
  end
end
