class SettingsController < ApplicationController
  before_action :authenticate_creator!, only: [:profile]

  def profile
    @creator = Creator.where(username: current_creator.username).select(:name, :bio, :twitter_handle, :username,
                                                                        :id, :email).first
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end
end
