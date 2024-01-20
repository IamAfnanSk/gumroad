class PageSection < ApplicationRecord
  belongs_to :creator

  enum :type, [ :product, :text, :featured_product ]
end
