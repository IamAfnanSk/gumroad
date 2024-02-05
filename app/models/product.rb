# frozen_string_literal: true

class Product < ApplicationRecord
  belongs_to :creator
  has_one_attached :cover_image
end
