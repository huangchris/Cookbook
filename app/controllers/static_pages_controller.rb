class StaticPagesController < ApplicationController
  before_action :require_logged_in

  def home
  end

  def require_logged_in
   unless current_user
     redirect_to new_session_url # halts request cycle
   end
 end
end
