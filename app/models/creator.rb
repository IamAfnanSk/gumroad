class Creator < ApplicationRecord
  has_many :page_sections
  has_many :posts
  has_many :products
end
