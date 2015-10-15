# == Route Map
#
#          Prefix Verb   URI Pattern                    Controller#Action
#            root GET    /                              static_pages#home
#           users POST   /users(.:format)               users#create
#        new_user GET    /users/new(.:format)           users#new
#         session POST   /session(.:format)             sessions#create
#     new_session GET    /session/new(.:format)         sessions#new
#                 DELETE /session(.:format)             sessions#destroy
#       api_users GET    /api/users(.:format)           api/users#index {:format=>:json}
#        api_user GET    /api/users/:id(.:format)       api/users#show {:format=>:json}
#                 PATCH  /api/users/:id(.:format)       api/users#update {:format=>:json}
#                 PUT    /api/users/:id(.:format)       api/users#update {:format=>:json}
#       api_group POST   /api/group(.:format)           api/groups#create {:format=>:json}
#                 GET    /api/group(.:format)           api/groups#show {:format=>:json}
# api_user_groups POST   /api/user_groups(.:format)     api/user_groups#create {:format=>:json}
#  api_user_group PATCH  /api/user_groups/:id(.:format) api/user_groups#update {:format=>:json}
#                 PUT    /api/user_groups/:id(.:format) api/user_groups#update {:format=>:json}
#                 DELETE /api/user_groups/:id(.:format) api/user_groups#destroy {:format=>:json}
#

Rails.application.routes.draw do
  root to: "static_pages#home"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :index, :update]
    resource :group, only: [:index, :show, :create]
    resources :user_groups, only: [:create, :update, :destroy]
  end

end
