class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(user_params)
    if @user
      login(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid email or password"]
      @user = User.new(user_params)
      render :new
    end
  end

  def destroy
    logout
    # redirect_to new_session_url
    render nothing: true
  end
end
