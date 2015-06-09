Rails.application.routes.draw do
  get '/', to: 'static_pages#front'
  get '/choose_role_sign_in', to: 'static_pages#choose_role_sign_in', as: :choose_role_sign_in
  get '/choose_role_registration', to: 'static_pages#choose_role_registration', as: :choose_role_registration

  resource :session, only: [:new, :create, :destroy]
  resources :fosterers
  resources :organizations

end
