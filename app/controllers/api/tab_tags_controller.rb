class Api::TabTagsController < ApplicationController
  def index
    @tabs = TabTag.all
  end
end
