class SessionsController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in, except: [:new, :create, :destroy, :sign_in_as_guest]
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

  def sign_in_as_guest
    user = Fabricate(
      :user,
      org_name: 'Guest',
      first_name: "Guest",
      last_name: 'Guest',
      password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y'
    )
    # user = User.find_by_credentials("f@w", "w")
    sign_in(user)
    redirect_to "/"
  end
end
