# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :creator

  has_many :page_section_posts, dependent: :destroy
  has_many :page_sections, through: :page_section_posts

  validates :title, presence: true, length: { minimum: 5 }
  validates :body, presence: true, length: { minimum: 4 }
end
