class Api::GroupsController < ApplicationController
  def show
    @group = current_user.groups.includes(:users).first
    @users = @group.users
  end

  def create
  end

  def update
  end
end
