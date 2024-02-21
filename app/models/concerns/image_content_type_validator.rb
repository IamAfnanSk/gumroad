# frozen_string_literal: true

module ImageContentTypeValidator
  extend ActiveSupport::Concern

  included do
    class_attribute :image_attachments

    self.image_attachments = []
  end

  class_methods do
    def validates_image_content_type(*attachments)
      self.image_attachments = attachments

      validate :validate_image_content_type
    end
  end

  private

  def validate_image_content_type
    self.class.image_attachments.each do |attachment|
      next unless send(attachment).attached?

      acceptable_types = %w[image/jpeg image/png image/jpg]
      images = Array(send(attachment))
      images.each do |image|
        errors.add(attachment, "must be a JPEG or PNG") unless acceptable_types.include?(image.blob.content_type)
      end
    end
  end
end
