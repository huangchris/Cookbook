class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.where(recipe_id: params[:id])
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      @comments = Comment.where(recipe_id: params[:comment][:recipe_id])
      render :index
    else
      render json: @comment.errors.full_messages
    end
  end

  private
  def comment_params
    data = params.require(:comment).permit(:recipe_id, :body)
    data[:user_id] = current_user.id
    data
  end
end
