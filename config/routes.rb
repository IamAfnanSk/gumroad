# frozen_string_literal: true

require_relative "../lib/constraints/profile_subdomain_constraint"
require_relative "../lib/constraints/app_subdomain_constraint"

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  devise_for :creators, only: %i[sessions registrations], path_names: {
    sign_in: "login", sign_out: "logout",
    sign_up: "signup"
  }

  constraints(AppSubDomainConstraint.new) do
    get "/settings/profile", to: "settings#profile", as: :settings_profile
    get "/posts", to: "posts#index"
    get "/products", to: "products#index"

    resources :creators, only: [:update], constraints: ->(request) { request.format == :json } do
      collection do
        post :add_dummy_posts_and_products, constraints: ->(request) { request.format == :json }
      end
    end
    resources :posts, only: %i[create update destroy], constraints: ->(request) { request.format == :json }
    resources :products, only: %i[create update destroy], constraints: ->(request) { request.format == :json }

    root to: redirect("/settings/profile"), as: :app_root
  end

  constraints(ProfileSubDomainConstraint.new) do
    root "profiles#index", as: :profile_root
    get "/posts", to: "profiles#index"
    get "/products", to: "profiles#index"

    resources :profiles, only: [] do
      member do
        put "update_section", constraints: ->(request) { request.format == :json }
        put "update_section_positions", constraints: ->(request) { request.format == :json }
        delete "delete_section", constraints: ->(request) { request.format == :json }
      end

      collection do
        post "add_section", constraints: ->(request) { request.format == :json }
      end
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  root "home#index"
end
