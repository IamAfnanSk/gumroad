# frozen_string_literal: true

class ProfileConstraint
  def matches?(request)
    Creator.where(username: request.subdomain).exists?
  end
end
