class Api::CommentsController < ApplicationController
  def index
    if params[:parent] == "Recipe"
      @comments = Comment.where(commentable_type: "Recipe")
        .where(commentable_id: params[:id])
    else
      @comments = Comment.where(commentable_type: "Group")
        .where(commentable_id: current_user.groups[0].id)
    end
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      if @comment.commentable_type == "Recipe"
        @comments = Comment.where(commentable_type: "Recipe")
          .where(commentable_id: @comment.commentable_id)
      else
        @comments = Comment.where(commentable_type: "Group")
          .where(commentable_id: current_user.groups[0].id)
      end
      render :index
    else
      render json: @comment.errors.full_messages, status: 400
    end
  end

  private
  def comment_params
    data = params.require(:comment).permit(:commentable_id, :body, :commentable_type)
    data[:user_id] = current_user.id
    if data[:commentable_id] == "" && data[:commentable_type] == "Group"
      data[:commentable_id] == current_user.groups[0].id
    end
    data
  end
end
