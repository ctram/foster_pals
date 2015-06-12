Rails.application.routes.draw do
  get '/', to: 'static_pages#home', as: :home
  get '/register', to: 'users#new', as: :register
  get '/sign-in', to: 'sessions#new', as: :sign_in
  get '/front', to: 'static_pages#front', as: :front
  get '/api/users/:id/animal-roster', to: 'api/users#animal_roster', as: :animal_roster_api_user
  post '/api/update_about_info', to: 'api/users#update_about_info', as: :update_about_info_api_user
  delete '/session/new', to: 'sessions#new'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :edit, :update, :update_about_info ]
    resources :animals, only: [:show, :edit, :update ]
    resources :messages, only: [:show, :edit, :update ]
    resources :stays, only: [:show, :edit, :update, :destroy ]
  end

  resources :static_pages, only: [:front]
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
