class Api::UserGroupsController < ApplicationController
  before_action :validate_user


  def update
    @user_group = UserGroup.find_by_user_id(params[:id])
    @group = @user_group.group
    if @user_group.update(user_group_params) && @group
      @users = @group.valid_users
      @new_users = @group.pending_users
      @admins = @group.admins
      render "api/groups/show"
    else
      render nothing: true, status: 500
    end
  end

  def create
    @user_group = UserGroup.new(user_id: current_user.id,
      group_id: params[:group_id], status: "pending")
    if @user_group.save
      redirect_to api_group_url
    else
      render json: @user_group.errors.full_messages, status: 422
    end
  end

  def destroy
    @user_group = UserGroup.includes(:user).find_by_user_id(params[:id])
    @group = @user_group.group
    @user_group.user.recipes.destroy_all
    @user_group.user.comments.destroy_all
    @user_group.user.requests.destroy_all
    if @user_group.destroy && @group
      @users = @group.valid_users
      @new_users = @group.pending_users
      @admins = @group.admins
      render "api/groups/show"
    else
      render nothing: true, status: 500
    end
  end

  private
  def user_group_params
    params.require(:user_group).permit(:user_id, :group_id, :status)
  end
end
