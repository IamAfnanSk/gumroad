# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :authenticate_creator!, only: %i[create update destroy]
  before_action :set_creator, only: %i[create update destroy]
  before_action :set_post, only: %i[create update destroy]

  def create
    @post = @creator.posts.build(post_params)

    if @post.save
      render json: { message: "Post was successfully created.", data: { post: @post } }, status: :created
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render json: { message: "Post was successfully updated.", data: { post: @post } }
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    render json: { message: "Post was successfully destroyed." }
  end

  private

  def set_creator
    @creator = current_creator
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
