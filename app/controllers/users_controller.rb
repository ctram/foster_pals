class UsersController < ApplicationController
  before_action :complete_attributes_for_user_creation, only: [:create]

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    @user = generate_lat_and_long_for_user @user

    if @user.save
      sign_in(@user)
      redirect_to "/"
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end


  private

  def user_params
    params.require(:user).permit(
      :password,
      :role,
      :org_name,
      :first_name,
      :last_name,
      :email,
      :street_address,
      :city,
      :state,
      :zip_code,
      :num_animals_willing_to_foster
    )
  end

  def complete_attributes_for_user_creation
    if params[:user][:role] == 'fosterer'
      params[:user][:org_name] = 'NOT_ORG'
    end
  end

end
