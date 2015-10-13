module ApplicationHelper

  def auth_token
    form_authenticity_token
  end
end
