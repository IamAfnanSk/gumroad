# frozen_string_literal: true

class PageSectionProduct < ApplicationRecord
  acts_as_list scope: :page_section

  belongs_to :page_section, dependent: :destroy
  belongs_to :product

  validate :section_type_matches

  validates :product_id, uniqueness: { scope: :page_section_id }

  def section_type_matches
    return if page_section.section_type == "product_list"

    errors.add(:page_section, "must be a product_list section")
  end
end
