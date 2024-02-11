# frozen_string_literal: true

class ProfilesController < ApplicationController
  before_action :load_creator, only: :index

  def index
    @posts = @creator.posts
    @products = @creator.products
    @page_sections = @creator.page_sections
  end

  private

  def load_creator
    @creator = Creator.find_by(username: request.subdomain)
    redirect_to(root_path, alert: "Creator not found") unless @creator
  end

  def creator_owns_this_profile?
    return false unless current_creator

    current_creator.id == @creator.id
  end

  helper_method :creator_owns_this_profile?
end
