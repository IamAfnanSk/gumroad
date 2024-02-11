# frozen_string_literal: true

require "constraints/profile_constraint"
require "constraints/app_constraint"

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  constraints(AppConstraint.new) do
    devise_for :creators, only: %i[sessions registrations], path_names: {
      sign_in: "login", sign_out: "logout",
      sign_up: "signup"
    }

    resources :creators, only: [:update]

    get "/settings/profile", to: "settings#profile", as: :profile_settings

    root to: redirect("/settings/profile"), as: :app_root
  end

  constraints(ProfileConstraint.new) do
    root "profiles#index", as: :profile_root
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  root "home#index"
end
