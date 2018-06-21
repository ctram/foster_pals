require_relative '../helpers/application_helper'

class UsersController < ApplicationController
  before_action :complete_attributes_for_user_creation, only: [:create]

  def new
    @user = User.new
    render layout: 'static_pages'
  end

  def create
    @user = User.create(user_params)
    @user = save_lat_and_long_from_zip_code @user

    if @user.save
      image = Fabricate(
        :image,
        url: ApplicationHelper.random_profile_image_url,
        thumb_url: ApplicationHelper.random_profile_image_url,
        imageable_id: @user.id,
        imageable_type: 'User'
      )
      
      redirect_to new_session_url
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
