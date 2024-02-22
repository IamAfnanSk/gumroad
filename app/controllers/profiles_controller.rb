# frozen_string_literal: true

class ProfilesController < ApplicationController
  before_action :authenticate_creator!, only: %i[update_section_positions add_section update_section delete_section]
  before_action :set_creator, only: %i[update_section_positions add_section update_section delete_section]

  before_action :load_creator, only: :index

  def index
    # Prefetch posts and products for each section
    @sections = @creator.page_sections.includes(:page_section_products, :page_section_posts,
                                                :featured_product).order(:position)

    @computed_sections = @sections.map do |section|
      compute_section_data(section)
    end

    return unless creator_owns_this_profile?

    @products = @creator.products.map do |product|
      compute_product_data(product)
    end
    @posts = @creator.posts
  end

  def update_section_positions
    @section = @creator.page_sections.find(params[:id])

    respond_to do |format|
      format.json do
        if update_section_positions_params[:where_to_move] == "down"
          @section.move_lower
        elsif update_section_positions_params[:where_to_move] == "up"
          @section.move_higher
        end

        if @section.errors.any?
          render_errors(@section.errors.full_messages)
        else
          render json: { message: "Section position updated successfully",
                         data: { idPositionMapping: compute_position_data } }
        end
      end
    end
  end

  def add_section
    @section = @creator.page_sections.new(section_params_for_db)

    respond_to do |format|
      format.json do
        if @section.save
          render json: { message: "Section added successfully",
                         data: { profileSection: compute_section_data(@section),
                                 idPositionMapping: compute_position_data } }
        else
          render_errors(@section.errors.full_messages)
        end
      end
    end
  end

  def update_section
    @section = @creator.page_sections.find(params[:id])

    respond_to do |format|
      format.json do
        if @section.update(section_params_for_db)
          handle_each_section_type_on_update

          @section.reload
          render json: { message: "Section updated successfully",
                         data: { carouselImages: @section.image_carousel? ? @section.carousel_images_data : [],
                                 featuredProduct: @section.featured_product.present? ? compute_product_data(@section.featured_product) : nil } }
        else
          render_errors(@section.errors.full_messages)
        end
      end
    end
  end

  def delete_section
    @section = @creator.page_sections.find(params[:id])

    respond_to do |format|
      format.json do
        if @section.destroy
          render json: { message: "Section deleted successfully",
                         data: { idPositionMapping: compute_position_data, deletedSectionId: params[:id].to_i } }
        else
          render_errors(@section.errors.full_messages)
        end
      end
    end
  end

  private

  def handle_each_section_type_on_update
    case @section.section_type
    when "product_list"
      @section.product_ids = params[:section][:product_ids].map(&:to_i)
    when "post_list"
      @section.post_ids = params[:section][:post_ids].map(&:to_i)
    when "image_carousel"
      handle_image_carousel_update
    else
      puts "No special handling for section type"
    end
  end

  def handle_image_carousel_update
    purge_unused_images(params[:section][:existing_carousel_image_ids] || [])
    attach_new_images(params[:section][:carousel_images])
  end

  def purge_unused_images(existing_image_ids)
    @section.carousel_images.each do |image|
      image.purge unless existing_image_ids.include?(image.id.to_s)
    end
  end

  def attach_new_images(image_files)
    image_files&.each do |image_file|
      @section.carousel_images.attach(image_file)
    end
  end

  def compute_section_data(section)
    {
      products: section.products.map { |product| compute_product_data(product) },
      posts: section.posts,
      carousel_images: section.carousel_images_data,
      featured_product: section.featured_product.present? ? compute_product_data(section.featured_product) : nil
    }.merge(section.attributes)
  end

  def compute_product_data(product)
    {
      cover_image_url: product.cover_image.attached? ? rails_blob_url(product.cover_image, only_path: true) : nil,
      creator: {
        name: product.creator.name,
        avatar_url: product.creator.avatar.attached? ? rails_blob_url(product.creator.avatar, only_path: true) : nil,
        username: product.creator.username
      }
    }.merge(product.attributes)
  end

  def render_errors(messages)
    render json: { errors: messages }, status: :unprocessable_entity
  end

  def compute_position_data
    @creator.page_sections.order(:position).pluck(:id, :position).to_h
  end

  def update_section_positions_params
    params.require(:section).permit(:where_to_move)
  end

  def section_params
    permitted_params = [
      :embed_height,
      :section_type,
      :title,
      :json_content,
      :embed_url,
      :featured_product_id,
      :show_title,
      :show_filters,
      :add_new_products_by_default,
      :raw_html,

      # non active record fields
      { carousel_images: [] },
      { existing_carousel_image_ids: [] },
      :product_ids,
      :post_ids
    ]

    permitted_params << :position if action_name == "add_section"

    params.require(:section).permit(permitted_params)
  end

  def section_params_for_db
    section_params.except(:existing_carousel_image_ids, :carousel_images)
  end

  # for subdomain requests
  def load_creator
    @creator = Creator.where(username: request.subdomain).select(:name, :bio, :twitter_handle, :username, :id,
                                                                 :email, :theme).first
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
