# EUTM!!!
class Api::RecipesController < ApplicationController

  def index
    if params[:id]
      @recipes = Recipe.find_by_user(params[:id])
    elsif params[:indexType] == "family"
      @recipes = Recipe.find_by_current_family(current_user)
    else
      @recipes = Recipe.find_by_user(current_user.id)
    end
  end

  def show
  end

  def create
    data = recipe_params
    data[:user_id] = current_user.id
    data[:group_id] = current_user.groups[0].id

    @recipe = Recipe.new(data)
    if @recipe.save
      @recipes = ( @recipe.personal ?
        Recipe.find_by_user(current_user.id) :
        Recipe.find_by_current_family(current_user) )
      render :index
    else
      render json: @recipe.errors.full_messages, status: 400
    end
  end

  def update
    @recipe = Recipe.find(params[:id])

    if @recipe && @recipe.update(recipe_params)
      @recipes = ( @recipe.personal ?
        Recipe.find_by_user(current_user.id) :
        Recipe.find_by_current_family(current_user) )
      render :index
    else
      render json: @recipe.errors.full_messages, status: 400
    end
  end

  def destroy
  end

  private
  def recipe_params
    params.require(:recipe).permit(:id, :title, :description, :ingredients, :instructions,
      :user_id, :group_id, :personal, :photo)
  end
end
