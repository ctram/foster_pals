Rails.application.routes.draw do
  get '/', to: 'static_pages#front'
  get '/register', to: 'static_pages#register', as: :register
  get '/sign-in', to: 'session#new'
  get '/home', to: 'static_pages#home', as: :home
  post '/process_registration', to: 'static_pages#process_registration', as: :process_registration

  get '/root', to: 'static_pages#root'
  get '/choose_role_sign_in', to: 'static_pages#choose_role_sign_in', as: :choose_role_sign_in
  get '/choose_role_registration', to: 'static_pages#choose_role_registration', as: :choose_role_registration

  namespace :api do
    resources :fosterers, only: [:show, :edit, :update ]
    resources :organizations, only: [:show, :edit, :update ]
    resources :animals, only: [:show, :edit, :update ]
    resources :messages, only: [:show, :edit, :update ]
    resources :stays, only: [:show, :edit, :update, :destroy ]
  end

  resource :session, only: [:new, :create, :destroy]
  resources :fosterers, only: [:new, :create]
  resources :organizations, only: [:new, :create]

end
