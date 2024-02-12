# frozen_string_literal: true

class Creator < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :page_sections
  has_many :posts
  has_many :products

  has_one_attached :avatar

  validates :bio, length: { maximum: 500 }
  validates :twitter_handle, format: { with: /\A\w+\z/, message: "Enter valid twitter url" },
                             allow_blank: true
  validate :avatar_type

  private

  def avatar_type
    return unless avatar.attached? && !avatar.content_type.in?(%w[image/jpeg image/png])

    errors.add(:avatar, "Avatar must be a JPEG or PNG")
  end
end
