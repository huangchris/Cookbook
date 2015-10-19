class Api::UsersController < ApplicationController
  before_action :validate_user
  
  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def index
    @users = Users.find_family
    render json: @users
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    render json: @user
  end
end
