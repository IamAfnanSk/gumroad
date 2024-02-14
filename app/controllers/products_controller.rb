# app/controllers/products_controller.rb

class ProductsController < ApplicationController
  before_action :authenticate_creator!, only: %i[create update destroy]
  before_action :set_creator, only: %i[create update destroy]
  before_action :set_product, only: %i[create update destroy]

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

  def set_creator
    @creator = current_creator
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def product_params
    params.require(:product).permit(:name, :description, :price)
  end
end
