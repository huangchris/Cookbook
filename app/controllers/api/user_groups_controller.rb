class Api::UserGroupsController < ApplicationController

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
  end

  def destroy
    @user_group = UserGroup.find_by_user_id(params[:id])
    @group = @user_group.group
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
