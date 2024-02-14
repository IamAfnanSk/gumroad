# frozen_string_literal: true

class ProfileConstraint
  def matches?(request)
    request.subdomain.present? && Creator.where(username: request.subdomain).exists?
  end
end
