class Api::RequestsController < ApplicationController
  def index
    @requests = Request.where(group_id: current_user.groups[0])
  end

  def create
    @request = Request.new(request_params)
    if @request.save
      @requests = Request.where(group_id: @request.group_id)
      render :index
    else
      render json: @request.errors.full_messages, status: 400
    end
  end

  private
  def request_params
    data = params.require(:request).permit(:title, :description)
    data[:user_id] = current_user.id
    data[:group_id] = current_user.groups[0].id
    data
  end
end
