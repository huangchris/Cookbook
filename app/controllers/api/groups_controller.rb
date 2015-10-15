class Api::GroupsController < ApplicationController
  def show
    @group = current_user.groups.first
    if @group
      @users = @group.valid_users
      p @users
      @new_users = @group.pending_users
      @admins = @group.admins
      render :show
    else
      render json: nil
    end
  end

  def index
  end

  def create
  end

end
