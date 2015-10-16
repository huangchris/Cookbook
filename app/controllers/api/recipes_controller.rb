class Api::RecipesController < ApplicationController

  def index
    if params[:id]
      @recipes = Recipe.find_by_user(params[:id])
    elsif params[:indexType] == "family"
      @recipes = Recipe.find_by_current_family(current_user)
    else
      @recipes = Recipe.find_by_user(current_user.id)
    end
    p @recipes
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end
end
