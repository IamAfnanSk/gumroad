# frozen_string_literal: true

class ProfilesController < ApplicationController
  before_action :load_creator, only: :show

  def show
    @posts = @creator.posts
    @products = @creator.products
    @page_sections = @creator.page_sections
  end

  private

  def load_creator
    @creator = Creator.find_by(username: params[:username])
    redirect_to(root_path, alert: "Creator not found") unless @creator
  end
end
