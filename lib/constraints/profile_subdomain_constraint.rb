# frozen_string_literal: true

class ProfileSubDomainConstraint
  def matches?(request)
    request.subdomain.present? && Creator.where(username: request.subdomain).exists?
  end
end
