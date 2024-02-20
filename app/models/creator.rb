# frozen_string_literal: true

class Creator < ApplicationRecord
  include LowercaseAttributes

  lowercase_attribute :username

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
  validates :username, presence: true, uniqueness: true
  validate :avatar_format

  private

  def avatar_format
    return unless avatar.attached?

    acceptable_types = %w[image/jpeg image/png image/jpg]
    return if acceptable_types.include?(avatar.blob.content_type)

    errors.add(:avatar, "must be a JPEG or PNG")
  end
end
