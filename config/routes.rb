Rails.application.routes.draw do
  get '/', to: 'static_pages#front'
  get '/register', to: 'users#new', as: :register
  get '/sign-in', to: 'sessions#new'
  get '/home', to: 'static_pages#home', as: :home
  post '/process_registration', to: 'static_pages#process_registration', as: :process_registration

  get '/root', to: 'static_pages#root'

  namespace :api do
    resources :users, only: [:show, :edit, :update ]

    resources :fosterers, only: [:show, :edit, :update ]
    resources :organizations, only: [:show, :edit, :update ]
    resources :animals, only: [:show, :edit, :update ]
    resources :messages, only: [:show, :edit, :update ]
    resources :stays, only: [:show, :edit, :update, :destroy ]
  end

  resource :session, only: [:new, :create, :destroy]

  resources :users, only: [:new, :create]

  resources :fosterers, only: [:new, :create]
  resources :organizations, only: [:new, :create]

end
