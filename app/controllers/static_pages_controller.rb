class StaticPagesController < ApplicationController

  def home
    redirect_to "users#new" unless current_user
  end
end
