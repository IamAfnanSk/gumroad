# frozen_string_literal: true

class Product < ApplicationRecord
  belongs_to :creator
  has_one_attached :cover_image

  has_many :page_section_products, dependent: :destroy
  has_many :page_sections, through: :page_section_products

  validates :creator_id, :currency, :name, :price, :permalink, :description, presence: true
  validates :price, numericality: { greater_than: 0 }
  validates :permalink, uniqueness: true
end
