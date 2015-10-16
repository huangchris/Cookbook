# == Route Map
#
#             Prefix Verb   URI Pattern                    Controller#Action
#               root GET    /                              static_pages#home
#              users POST   /users(.:format)               users#create
#           new_user GET    /users/new(.:format)           users#new
#            session POST   /session(.:format)             sessions#create
#        new_session GET    /session/new(.:format)         sessions#new
#                    DELETE /session(.:format)             sessions#destroy
#          api_users GET    /api/users(.:format)           api/users#index {:format=>:json}
#           api_user GET    /api/users/:id(.:format)       api/users#show {:format=>:json}
#                    PATCH  /api/users/:id(.:format)       api/users#update {:format=>:json}
#                    PUT    /api/users/:id(.:format)       api/users#update {:format=>:json}
#          api_group POST   /api/group(.:format)           api/groups#create {:format=>:json}
#                    GET    /api/group(.:format)           api/groups#show {:format=>:json}
#         api_groups GET    /api/groups(.:format)          api/groups#index {:format=>:json}
#    api_user_groups POST   /api/user_groups(.:format)     api/user_groups#create {:format=>:json}
#     api_user_group PATCH  /api/user_groups/:id(.:format) api/user_groups#update {:format=>:json}
#                    PUT    /api/user_groups/:id(.:format) api/user_groups#update {:format=>:json}
#                    DELETE /api/user_groups/:id(.:format) api/user_groups#destroy {:format=>:json}
#        api_recipes GET    /api/recipes(.:format)         api/recipes#index {:format=>:json}
#                    POST   /api/recipes(.:format)         api/recipes#create {:format=>:json}
#         api_recipe GET    /api/recipes/:id(.:format)     api/recipes#show {:format=>:json}
#                    PATCH  /api/recipes/:id(.:format)     api/recipes#update {:format=>:json}
#                    PUT    /api/recipes/:id(.:format)     api/recipes#update {:format=>:json}
#                    DELETE /api/recipes/:id(.:format)     api/recipes#destroy {:format=>:json}
# api_recipes_shared GET    /api/recipes/shared(.:format)  api/recipes/recipes#index_shared {:format=>:json}
#                    GET    /api/recipes/:id(.:format)     api/recipes/recipes#index_sibling {:format=>:json}
#

Rails.application.routes.draw do
  root to: "static_pages#home"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :index, :update]
    resource :group, only: [:index, :show, :create]
    get "groups", to: "groups#index"
    resources :user_groups, only: [:create, :update, :destroy]
    resources :recipes, only: [:create, :index, :update, :destroy, :show]
    namespace :recipes do
      # these overlap with show and with each other 
      get "shared", to: "recipes#index_shared"
      get "/:id", to: "recipes#index_sibling"
    end
  end

end
