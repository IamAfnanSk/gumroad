# frozen_string_literal: true

module LowercaseAttributes
  extend ActiveSupport::Concern

  included do
    before_save { |record| downcase_attributes(record) }
  end

  def downcase_attributes(record)
    self.class.downcase_attributes.each do |attribute|
      record[attribute] = record[attribute].downcase if record[attribute].respond_to?(:downcase)
    end
  end

  class_methods do
    attr_accessor :downcase_attributes

    def lowercase_attribute(*attributes)
      self.downcase_attributes ||= []
      self.downcase_attributes += attributes
    end
  end
end
