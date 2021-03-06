Rails.application.routes.draw do


  devise_for :users,
  :controllers  => {
   :registrations => 'my_devise/registrations',
 }

 root to: "home#home"
 get '/dashboard' => 'dashboard#show'
 get '/users.json' => 'users#load_users'

 get '/locations/:id/home' => 'users#make_home', as: 'make_user_home'
 get '/locations/:id/work' => 'users#make_work', as: 'make_user_work'

 patch '/meetups/:id/dates' => 'meetups#add_dates', as: 'add_dates'

 resources :invitations
 resources :locations
 resources :meetups
 resources :venue_suggestions do
  member do
    get 'vote', to: 'votes#vote_venue'
  end
 end
 resources :date_options do
  member do
    post 'vote', to: 'votes#vote_date'
  end
end
 resources :meetups do
  resources :invitations
  resources :comments
  resources :venue_suggestions
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
