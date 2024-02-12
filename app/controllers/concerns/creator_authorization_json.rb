# frozen_string_literal: true

module CreatorAuthorizationJSON
  extend ActiveSupport::Concern

  included do
    before_action :set_creator
  end

  private

  def set_creator
    # For safety of password, not fetching all fields
    @creator = Creator.where(id: params[:id]).select(:name, :bio, :twitter_handle, :username,
                                                     :id, :email).first
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Creator not found" }, status: :not_found
  end

  def authorize_creator
    render json: { error: "Not authorized" }, status: :forbidden unless current_creator == @creator
  end
end
