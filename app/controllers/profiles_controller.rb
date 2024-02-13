# frozen_string_literal: true

class ProfilesController < ApplicationController
  before_action :load_creator, only: :index

  def index; end

  private

  def load_creator
    @creator = Creator.where(username: request.subdomain).select(:name, :bio, :twitter_handle, :username, :id,
                                                                 :email).first
    redirect_to(root_path, alert: "Page not found") unless @creator
  end

  def creator_owns_this_profile?
    current_creator&.id == @creator.id
  end

  helper_method :creator_owns_this_profile?
end
