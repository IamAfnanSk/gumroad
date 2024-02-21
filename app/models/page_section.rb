# frozen_string_literal: true

class PageSection < ApplicationRecord
  include ImageContentTypeValidator

  acts_as_list
  validates_image_content_type :carousel_images

  enum section_type: { wysiwyg: 0, product_list: 1, featured_product: 2, embed: 3, post_list: 4, subscribe: 5,
                       image_carousel: 6, custom_html: 7 }

  belongs_to :creator
  belongs_to :featured_product, class_name: "Product", optional: true

  has_many :page_section_products, dependent: :destroy
  has_many :products, through: :page_section_products

  has_many :page_section_posts, dependent: :destroy
  has_many :posts, through: :page_section_posts

  has_many_attached :carousel_images

  validate :json_content_is_valid_json

  validates :embed_url, url: true, allow_blank: true

  validates :section_type, presence: true

  validates :show_title, inclusion: { in: [true, false] }, allow_blank: true
  validates :show_filters, inclusion: { in: [true, false] }, allow_blank: true
  validates :add_new_products_by_default, inclusion: { in: [true, false] }, allow_blank: true

  def carousel_images_data
    carousel_images.map do |image|
      {
        id: image.id,
        url: Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true)
      }
    end
  end

  private

  def json_content_is_valid_json
    return true if json_content.blank?

    JSON.parse(json_content)
  rescue JSON::ParserError
    errors.add(:json_content, "must be a valid JSON")
  end
end
