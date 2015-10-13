class StaticPagesController < ApplicationController

  def home
    p current_user
    redirect_to new_user_url unless current_user
  end
end
