# frozen_string_literal: true

class PageSectionPost < ApplicationRecord
  acts_as_list scope: :page_section

  belongs_to :post, dependent: :destroy
  belongs_to :page_section, dependent: :destroy

  validate :section_type_matches

  validates :post_id, uniqueness: { scope: :page_section_id }

  private

  def section_type_matches
    return if page_section.section_type == "post_list"

    errors.add(:page_section, "must be a post_list section")
  end
end
