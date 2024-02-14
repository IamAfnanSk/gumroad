# frozen_string_literal: true

class ProfilesController < ApplicationController
  before_action :load_creator, only: :index

  def index
    # Prefetch posts and products for each section
    @sections = @creator.page_sections.includes(:page_section_products, :page_section_posts).order(:position)

    @computed_sections = @sections.map do |section|
      {
        products: section.products,
        posts: section.posts,
        carousel_images: section.carousel_image_urls
      }.merge(section.attributes)
    end.as_json

    puts @computed_sections

    @products = @creator.products.select(:id, :name).as_json if creator_owns_this_profile?
    @posts = @creator.posts.select(:id, :title).as_json if creator_owns_this_profile?
  end

  private

  def load_creator
    @creator = Creator.where(username: request.subdomain).select(:name, :bio, :twitter_handle, :username, :id,
                                                                 :email).first
  end

  def creator_owns_this_profile?
    current_creator&.id == @creator.id
  end

  helper_method :creator_owns_this_profile?
end
