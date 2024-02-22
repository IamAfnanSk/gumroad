# frozen_string_literal: true

require "open-uri"

class CreatorsController < ApplicationController
  before_action :authenticate_creator!, only: %i[update add_dummy_posts_and_products]

  def update
    @creator = current_creator

    respond_to do |format|
      format.json do
        if @creator.update(creator_params)
          render json: { message: "Creator updated successfully" }
        else
          render json: { errors: @creator.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end
  end

  def add_dummy_posts_and_products
    @creator = current_creator

    respond_to do |format|
      format.json do
        if @creator.posts.any? && @creator.products.any?
          render json: { errors: ["You already have posts and products"] }, status: :unprocessable_entity
          return
        end

        posts_saved = create_dummy_posts
        products_saved = create_dummy_products

        if posts_saved.all? && products_saved.all?
          render json: { message: "Dummy posts and products added successfully" }
        else
          render json: { errors: ["Failed to add some dummy posts or products"] }, status: :unprocessable_entity
        end
      end
    end
  end

  private

  def create_dummy_posts
    Array.new(10) do
      post = Post.new
      post.title = Faker::Lorem.sentence
      post.body = Faker::Lorem.paragraph
      post.creator = @creator
      post.save
    end
  end

  def create_dummy_products
    Array.new(10) do
      product = Product.new
      product.name = Faker::Commerce.product_name
      product.description = Faker::Lorem.paragraph
      product.price = Faker::Commerce.price
      product.creator = @creator
      product.currency = "$"
      product.permalink = Faker::Internet.slug

      image_url = Faker::LoremFlickr.image(size: "1600x900", search_terms: ["product"])
      downloaded_image = URI.open(image_url)

      filename = "image_#{Time.now.to_i}.jpg"
      product.cover_image.attach(io: downloaded_image, filename: filename)

      product.save
    end
  end

  def creator_params
    params.require(:creator).permit(:name, :bio, :twitter_handle, :avatar, :username, :theme)
  end
end
