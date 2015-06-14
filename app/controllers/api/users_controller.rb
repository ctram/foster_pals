class Api::UsersController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in, except: [:new, :create]

  def show
    @user = User.find(params[:id])
    @animals = @user.animals_as_org
    render :show
  end

  def edit
    @user = User.find(params[:id])
    render :show
  end

  def index
    # TODO: add search feature - have the backbone query hit the users#index and return only the users that match the query 
    @users = User.all
    render json: @users
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    render :show
  end

# TODO: move update_about_info into update() -- redundant
  def update_about_info
    user_id = params[:user][:id]
    about_info = params[:user][:about_info]
    user = User.find_by_id(user_id)
    user.about_info = about_info
    user.save
    render :show
  end

  def animal_roster
    @user = User.find(params[:id])
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
      :num_animals_willing_to_foster,
      :about_info
    )
  end

end
