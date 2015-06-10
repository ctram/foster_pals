class SessionsController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in, except: [:new, :create, :destroy]
  skip_before_filter :verify_authenticity_token, :only => [:destroy]

  def new
  end

  def create
    email = params[:user][:email]
    password = params[:user][:password]

    user = User.find_by_credentials(email, password)

    if user
      sign_in(user)
      user_id = user.id
      user_role = user.class.to_s.downcase + 's'
      redirect_to "/"

    else
      flash.now[:errors] = ["Invalid username or password"]
      render :new
    end
  end

  def destroy
    sign_out
    render json: {}
  end
end
