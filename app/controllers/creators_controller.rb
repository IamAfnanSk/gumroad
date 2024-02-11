# frozen_string_literal: true

class CreatorsController < ApplicationController
  before_action :authenticate_creator!

  def update
    # TODO: fix find query
    @creator = Creator.find(params[:id])

    respond_to do |format|
      if @creator.update(creator_params)
        format.json { render json: @creator }
      else
        format.json { render json: @creator.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def creator_params
    # TODO: add permit params
    params.require(:creator).permit(:title, :body)
  end
end
