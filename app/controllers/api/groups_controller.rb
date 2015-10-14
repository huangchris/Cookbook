class Api::GroupsController < ApplicationController
  def show
    @group = current_user.groups.includes(:users).first
    if @group
      @users = @group.valid_users
      @new_users = @group.pending_users
      @admins = @group.admins
      render :show
    else
      render json: nil
    end
  end

  def create
  end

  def update
  end
end
