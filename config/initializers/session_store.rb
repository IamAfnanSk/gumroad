# frozen_string_literal: true

Rails.application.config.session_store :cookie_store, key: "_gumroad_session", domain: :all, tld_length: 2
