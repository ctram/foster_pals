Rails.application.routes.draw do
  get '/', to: 'static_pages#home', as: :home
  get '/register', to: 'users#new', as: :register
  get '/sign-in', to: 'sessions#new', as: :sign_in
  get '/front', to: 'static_pages#front', as: :front
  get '/api/users/:id/animal-roster', to: 'api/users#animal_roster', as: :animal_roster_api_user
  get '/sign-in-as-guest', to: 'sessions#sign_in_as_guest', as: :sign_in_as_guest
  post '/api/update_about_info', to: 'api/users#update_about_info', as: :update_about_info_api_user
  delete '/session/new', to: 'sessions#new'

  namespace :api, defaults: {format: :json} do
    resources :animals, only: [:show, :update, :create, :index ]
    resources :images, only: [:index, :create, :show]
    resources :messages, only: [:show, :update, :create, :destroy ]
    resources :stays, only: [:show, :update, :create, :destroy ]
    resources :users, only: [:show, :edit, :index, :update, :update_about_info, :filter_by_location ]
  end

  resources :static_pages, only: [:front]
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
