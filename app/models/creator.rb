class Creator < ApplicationRecord
  has_many :pages, :posts, :products
end
