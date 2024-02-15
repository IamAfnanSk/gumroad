# frozen_string_literal: true

class ProfilesController < ApplicationController
  before_action :authenticate_creator!, only: %i[update_section_positions add_section update_section delete_section]
  before_action :set_creator, only: %i[update_section_positions add_section update_section delete_section]

  before_action :load_creator, only: :index

  def index
    # Prefetch posts and products for each section
    @sections = @creator.page_sections.includes(:page_section_products, :page_section_posts).order(:position)

    @computed_sections = @sections.map do |section|
      compute_section_data(section)
    end

    if creator_owns_this_profile?
      @products = @creator.products.map do |product|
        compute_product_data(product)
      end
    end
    @posts = @creator.posts if creator_owns_this_profile?
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end

  def update_section_positions
    @section = @creator.page_sections.find(params[:id])

    if update_section_positions_params[:where_to_move] == "down"
      @section.move_lower
    elsif update_section_positions_params[:where_to_move] == "up"
      @section.move_higher
    end

    if @creator.page_sections.present?
      render json: {
        message: "Section position updated successfully",
        data: compute_position_data
      }
    else
      render json: {
        message: "No sections found for this creator",
        data: {}
      }
    end
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end

  def add_section
    @section = @creator.page_sections.new(section_params)

    if @section.save
      render json: { message: "Section added successfully", data: {
        section: compute_section_data(@section),
        id_position_mapping: compute_position_data
      } }
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

      render json: { message: "Section updated successfully",
                     data: @section.image_carousel? ? @section.carousel_image_urls : {} }
    else
      render json: { errors: @section.errors.full_messages }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end

  def delete_section
    @section = @creator.page_sections.find(params[:id])

    if @section.destroy
      render json: { message: "Section deleted successfully",
                     data: compute_position_data }
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
    else
      puts "No special handling for section type"
    end
  end

  def handle_image_carousel
    frontend_image_urls = params[:section][:carousel_image_urls]

    puts frontend_image_urls

    # Remove images that are not included in the frontend_image_urls
    @section.carousel_images.each do |image|
      image.purge unless frontend_image_urls.include?(rails_blob_url(image))
    end

    # Attach new images
    new_image_files = params[:section][:carousel_images] || []
    puts new_image_files
    new_image_files.each do |image_file|
      @section.carousel_images.attach(image_file)
    end
  end

  def compute_section_data(section)
    {
      products: section.products.map do |product|
        compute_product_data(product)
      end,
      posts: section.posts,
      carousel_images: section.carousel_image_urls
    }.merge(section.attributes)
  end

  def compute_product_data(product)
    {
      cover_image_url: product.cover_image.attached? ? rails_blob_url(product.cover_image) : nil
    }.merge(product.attributes)
  end

  def compute_position_data
    @creator.page_sections.order(:position).pluck(:id, :position).to_h
  end

  def update_section_positions_params
    params.require(:section).permit(:where_to_move)
  end

  def section_params
    permitted_params = [:carousel_images, :embed_height, :product_ids, :post_ids, :section_type, :title, :json_content, :embed_url, :featured_product_id,
                        :show_title, :show_filters, :add_new_products_by_default, { carousel_images: [], carousel_image_urls: [] }]
    permitted_params << :position if action_name == "add_section"
    params.require(:section).permit(permitted_params)
  end

  # for subdomain requests
  def load_creator
    @creator = Creator.where(username: request.subdomain).select(:name, :bio, :twitter_handle, :username, :id,
                                                                 :email).first
  end

  # For json requests
  def set_creator
    @creator = current_creator
  end

  def creator_owns_this_profile?
    current_creator&.id == @creator.id
  end

  helper_method :creator_owns_this_profile?
end
