class SettingsController < ApplicationController
  before_action :authenticate_creator!, only: [:profile]

  def profile
    @creator = Creator.where(username: current_creator.username).select(:name, :bio, :twitter_handle, :username,
                                                                        :id, :email).first
  end
end
