# This need a lot of refactoring.
class Api::RecipesController < ApplicationController
  before_action :validate_user
  before_action :validate_sub_data, only: [:create, :update]

  def index
    @recipes = Recipe.includes(:search_tags, :ingredients, :instructions)
      .find_by_current_family(current_user)
  end

  def show
  end

  def create
    data = recipe_params
    data[:user_id] = current_user.id
    data[:group_id] = current_user.groups[0].id

    @recipe = Recipe.new(data)
    if @recipe.save
      if params[:request_id]
        Request.destroy(params[:request_id])
      end

        params[:recipe][:ingredients].each do |idx, ing|
          Ingredient.create(data: ing[:data], recipe_id: @recipe.id, ord: (idx.to_i + 1))
        end
        params[:recipe][:instructions].each do |idx, inst|
          Instruction.create(data: inst[:data], recipe_id: @recipe.id, ord: (idx.to_i + 1))
        end
        params[:recipe][:search_tags].each do |idx, tag|
          @tag = SearchTag.find_by_data(tag[:data])
          unless @tag
            @tag = SearchTag.create(data: tag[:data])
          end
          RecipeSearchTag.create({recipe_id: @recipe.id, search_tag_id: @tag.id})
        end

      @recipes = Recipe.includes(:ingredients).includes(:instructions)
        .find_by_current_family(current_user)
      render :index
    else
      render json: @recipe.errors.full_messages, status: 400
    end
  end

  def update
    @recipe = Recipe.find(params[:id])

    if @recipe && @recipe.update(recipe_params)
      @recipe.ingredients.select{|ing| params[:recipe][:ingredients]
          .values.include?(ing)}.each{|ing| ing.destroy}
      params[:recipe][:ingredients].each do |idx, ing|
        next if ing[:ing] == "" && ing[:id].nil
        if ing[:id]
          ingredient = Ingredient.find(ing[:id])
          ing[:data] == "" ? ingredient.destroy : ingredient.update(data: ing[:data])
        else
          Ingredient.create(data: ing[:data], recipe_id: @recipe.id, ord: (idx.to_i + 1))
        end
      end
      @recipe.instructions.select{|inst| params[:recipe][:instructions]
          .values.include?(inst)}.each{|ing| ing.destroy}
      params[:recipe][:instructions].each do |idx, inst|
        next if inst[:inst] == "" && inst[:id].nil
        if inst[:id]
          instruction = Instruction.find(inst[:id])
          inst[:data] == "" ? instruction.destroy : instruction.update(data: inst[:data])
        else
          Instruction.create(data: inst[:data], recipe_id: @recipe.id, ord: (idx.to_i + 1))
        end
      end

      params[:recipe][:search_tags].each do |idx, tag|
        @tag = SearchTag.find_by_data(tag[:data])
        unless @tag
          @tag = SearchTag.create(data: tag[:data])
        end
        @tagging = RecipeSearchTag.where(recipe_id: @recipe.id, search_tag_id: @tag.id)
        if @tagging.empty?
          RecipeSearchTag.create({recipe_id: @recipe.id, search_tag_id: @tag.id})
        end
      end

      @recipes = Recipe.find_by_current_family(current_user)
      render :index
    else
      render json: @recipe.errors.full_messages, status: 400
    end
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    if @recipe && @recipe.user_id == current_user.id
      @recipe.destroy
      render json: @recipe
    else
      render json: "invalid request", status: 400
    end
  end

  def pictures
    @pics = Recipe.where.not(photo: "").select(:photo).sample(9)
    render json: @pics.map{|pic| pic.photo}
  end

  private
  def recipe_params
    params.require(:recipe).permit(:id, :title, :description,
      :user_id, :group_id, :personal, :photo, :tab_tag_id)
  end

  def validate_sub_data
    # ... This doesn't quite work the way I wanted
    if (params[:recipe][:ingredients].nil? || params[:recipe][:instructions].nil? ||
      params[:recipe][:ingredients].select{|_, ing| !ing[:data].nil? && ing[:data] != ""}.empty? ||
       params[:recipe][:instructions].select{|_, inst| !inst[:data].nil? && inst[:data] != ""}.empty? )
      render json: "Insufficient Data", status: 400
    end
  end
end
