# frozen_string_literal: true

class AppConstraint
  def matches?(request)
    request.subdomain == "app"
  end
end
