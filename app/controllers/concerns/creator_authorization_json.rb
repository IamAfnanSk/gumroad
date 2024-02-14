# frozen_string_literal: true

module CreatorAuthorizationJSON
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_creator!
    before_action :set_creator
  end

  private

  def set_creator
    # For safety of password, not fetching all fields
    @creator = Creator.where(id: params[:id]).select(:name, :bio, :twitter_handle, :username,
                                                     :id, :email).first
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Creator not found" }, status: :not_found
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end

  def authorize_creator_for_json_requests
    render json: { error: "Not authorized" }, status: :forbidden unless current_creator == @creator
  rescue StandardError => e
    render json: { error: "An error occurred: #{e.message}" }, status: :internal_server_error
  end
end
