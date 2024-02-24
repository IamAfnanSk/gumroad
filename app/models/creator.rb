# frozen_string_literal: true

class Creator < ApplicationRecord
  include LowercaseAttributes
  include ImageContentTypeValidator

  lowercase_attribute :username
  validates_image_content_type :avatar

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :page_sections, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :products, dependent: :destroy

  has_one_attached :avatar

  validates :bio, length: { maximum: 500 }
  validates :twitter_handle,
            format: { with: /\A[a-zA-Z0-9_]{1,15}\z/, message: "should be a valid twitter handle without @" }, allow_blank: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, presence: true, uniqueness: true,
                       format: { with: /\A[a-z0-9]([a-z0-9\-]{0,61}[a-z0-9])?\z/i, message: "is invalid" }
end
