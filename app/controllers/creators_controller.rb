# frozen_string_literal: true

require_relative "concerns/creator_authorization_json"

class CreatorsController < ApplicationController
  include CreatorAuthorizationJSON

  before_action :authorize_creator_for_json_requests, only: [:update]

  def update
    respond_to do |format|
      format.json do
        if @creator.update(creator_params)
          render json: { message: "Creator updated successfully" }
        else
          puts @creator.errors
          render json: { errors: @creator.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end
  end

  private

  def creator_params
    params.require(:creator).permit(:name, :bio, :twitter_handle, :avatar, :username)
  end
end
