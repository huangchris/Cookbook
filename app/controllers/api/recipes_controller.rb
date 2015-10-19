# EUTM!!!
class Api::RecipesController < ApplicationController
  before_action :validate_user

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
        p params[:recipe][:ingredients]
        params[:recipe][:ingredients].each do |idx, ing|
          p ing
          p ing.class
          p idx
          p idx.class
          Ingredient.create(data: ing[:data], recipe_id: @recipe.id, ord: (idx.to_i + 1))
        end
        params[:recipe][:instructions].each do |idx, inst|
          Instruction.create(data: inst[:data], recipe_id: @recipe.id, ord: (idx.to_i + 1))
        end

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
      params[:recipe][:ingredients].each do |idx, ing|
        next if ing[:ing] == ""
        if ing[:id]
          Ingredient.find(ing[:id]).update(data: ing[:data])
        else
          Ingredient.create(data: ing[:data], recipe_id: @recipe.id, ord: (idx.to_i + 1))
        end
      end
      params[:recipe][:instructions].each do |idx, inst|
        inst[:inst]
        if inst[:id]
          Instruction.find(inst[:id]).update(data: inst[:data])
        else
          Instruction.create(data: inst[:data], recipe_id: @recipe.id, ord: (idx.to_i + 1))
        end
      end
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
    params.require(:recipe).permit(:id, :title, :description,
      :user_id, :group_id, :personal, :photo)
  end
end
