# frozen_string_literal: true

class ProfilesController < ApplicationController
  def show
    @creator = Creator.find_by username: params[:username]
    @posts = Post.where creator_id: @creator.id
    @products = Product.where creator_id: @creator.id
  end
end
