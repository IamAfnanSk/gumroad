# frozen_string_literal: true

class PageSection < ApplicationRecord
  belongs_to :creator
  belongs_to :sectionable, polymorphic: true
end
