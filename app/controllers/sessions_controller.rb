class SessionsController < ApplicationController
  def new
  end

  def create
    email = params[:user][:email]
    password = params[:user][:password]

    user = find_by_credentials(email, password)

    if user
      sign_in(user)
      user_id = user.id
      user_role = user.class.to_s.downcase + 's'
      redirect_to "/#{user_role}/#{user_id}"

    else
      flash.now[:errors] = ["Invalid username or password"]
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end
end
