# app/controllers/products_controller.rb

require_relative "concerns/creator_authorization_json"

class ProductsController < ApplicationController
  include CreatorAuthorizationJSON

  before_action :set_product, only: %i[show update destroy]
  before_action :authorize_creator_for_json_requests, only: %i[update destroy]

  def create
    @product = @creator.products.build(product_params)

    if @product.save
      render json: { message: "Product was successfully created.", product: @product }, status: :created
    else
      render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end

  def update
    if @product.update(product_params)
      render json: { message: "Product was successfully updated.", product: @product }
    else
      render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
    end
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end

  def destroy
    @product.destroy
    render json: { message: "Product was successfully destroyed." }
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def product_params
    params.require(:product).permit(:name, :description, :price)
  end
end
