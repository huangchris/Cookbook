# == Route Map
#
#      Prefix Verb   URI Pattern              Controller#Action
#        root GET    /                        static_pages#home
#       users POST   /users(.:format)         users#create
#    new_user GET    /users/new(.:format)     users#new
#     session POST   /session(.:format)       sessions#create
# new_session GET    /session/new(.:format)   sessions#new
#             DELETE /session(.:format)       sessions#destroy
#   api_users GET    /api/users(.:format)     api/users#index {:format=>:json}
#    api_user GET    /api/users/:id(.:format) api/users#show {:format=>:json}
#             PATCH  /api/users/:id(.:format) api/users#update {:format=>:json}
#             PUT    /api/users/:id(.:format) api/users#update {:format=>:json}
#   api_group POST   /api/group(.:format)     api/groups#create {:format=>:json}
#             GET    /api/group(.:format)     api/groups#show {:format=>:json}
#             PATCH  /api/group(.:format)     api/groups#update {:format=>:json}
#             PUT    /api/group(.:format)     api/groups#update {:format=>:json}
#

Rails.application.routes.draw do
  root to: "static_pages#home"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :index, :update]
    resource :group, only: [:show, :create, :update]
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
