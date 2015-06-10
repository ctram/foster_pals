class UsersController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in, except: [:new, :create]
  before_action :complete_attributes_for_user_creation, only: [:create]

  def new
    @user = User.new
  end

# TODO: write before action for users#create that auto fills out the remaining attributes for the user - if user is a fosterer than auto fill out the org name.
  def create
    debugger
    @user = User.create(user_params)
    if @user.save
      sign_in(@user)
      id = @user.id
      redirect_to "/"
      # redirect_to home_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def edit
    @user = User.find(params[:id])
    render json: @user
  end

  def index
    @users = User.all
    render json: @users
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
