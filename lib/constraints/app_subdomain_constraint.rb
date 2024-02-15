# frozen_string_literal: true

class AppSubDomainConstraint
  def matches?(request)
    request.subdomain == "app"
  end
end
