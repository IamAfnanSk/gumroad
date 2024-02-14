# frozen_string_literal: true

require_relative "concerns/creator_authorization_json"

class ProfilesController < ApplicationController
  include CreatorAuthorizationJSON

  before_action :load_creator, only: :index
  before_action :authorize_creator_for_json_requests,
                only: %i[update_section_positions add_section update_section delete_section]

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
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end

  def update_section_positions
    @section = @creator.page_sections.find(update_section_positions_params[:id])

    if update_section_positions_params[:where_to_move] == "up"
      @section.move_lower
    elsif update_section_positions_params[:where_to_move] == "down"
      @section.move_higher
    end

    render json: { message: "Section position updated successfully" }
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end

  def add_section
    @section = @creator.page_sections.new(section_params)

    if @section.save
      render json: { message: "Section added successfully" }
    else
      render json: { errors: @section.errors.full_messages }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end

  def update_section
    @section = @creator.page_sections.find(params[:id])

    if @section.update(section_params)
      handle_section_type

      render json: { message: "Section updated successfully" }
    else
      render json: { errors: @section.errors.full_messages }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end

  def delete_section
    @section = @creator.page_sections.find(params[:id])

    if @section.destroy
      render json: { message: "Section deleted successfully" }
    else
      render json: { errors: @section.errors.full_messages }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end

  private

  def handle_section_type
    case @section.section_type
    when "product_list"
      @section.product_ids = params[:section][:product_ids].map(&:to_i)
    when "post_list"
      @section.post_ids = params[:section][:post_ids].map(&:to_i)
    when "image_carousel"
      handle_image_carousel
    end
  end

  def handle_image_carousel
    frontend_image_urls = params[:section][:carousel_image_urls]

    # Remove images that are not included in the frontend_image_urls
    @section.carousel_images.each do |image|
      image.purge unless frontend_image_urls.include?(rails_blob_url(image))
    end

    # Attach new images
    new_image_files = params[:section][:carousel_images] || []
    new_image_files.each do |image_file|
      @section.carousel_images.attach(image_file)
    end
  end

  def update_section_positions_params
    params.require(:section).permit(:where_to_move)
  end

  def section_params
    params.require(:section).permit(:section_type, :title, :json_content, :embed_url, :featured_product_id,
                                    :show_title, :show_filter, :add_new_products_by_default, carousel_images: [], carousel_image_urls: [])
  end

  def load_creator
    @creator = Creator.where(username: request.subdomain).select(:name, :bio, :twitter_handle, :username, :id,
                                                                 :email).first
  end

  def creator_owns_this_profile?
    current_creator&.id == @creator.id
  end

  helper_method :creator_owns_this_profile?
end
