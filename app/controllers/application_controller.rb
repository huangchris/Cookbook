class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user

  def login(user)
    user.assign_session_token
    session[:session_token] = user.session_token
  end

  def logout
    if current_user
      current_user.logout
    end
    session[:session_token] = nil
  end

  def current_user
    User.find_by_token(session[:session_token])
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :name)
  end
end
