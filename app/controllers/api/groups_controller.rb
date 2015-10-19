class Api::GroupsController < ApplicationController
  def show
    @group = current_user.groups.first
    if @group
      @users = @group.valid_users
      @new_users = @group.pending_users
      @admins = @group.admins
      render :show
    else
      render json: nil, status: 404
    end
  end

  def index
    if !current_user.groups.empty?
      # this may change in the future to allow multiple groups.
      render nothing: true, status: 400
    else
      @groups = Group.all
      render :index
    end
  end

  def create
    @group = Group.new(name: params[:name])
    if @group.save
      UserGroup.create(user_id: current_user.id, group_id: @group.id, status: "admin")
      @users = [current_user]
      @new_users = []
      @admins = @group.admins
      render :show
    else
      render json: @group.errors.full_messages, status: 500
    end
  end
  #
  # private
  # def group_params
  #   params.require(:group).permit(:name)
  # end
end
