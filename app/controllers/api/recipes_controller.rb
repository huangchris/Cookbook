class Api::RecipesController < ApplicationController

  def index
    render json:"self request received"
  end

  def index_shared
  render json:"family request received"
  end

  def index_sibling
    render json:"sibling request received"
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
