# frozen_string_literal: true

class CreatorsController < ApplicationController
  before_action :authenticate_creator!, only: [:update]

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

  private

  def creator_params
    params.require(:creator).permit(:name, :bio, :twitter_handle, :avatar, :username, :theme)
  end
end
