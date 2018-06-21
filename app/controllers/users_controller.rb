require_relative '../helpers/application_helper'

class UsersController < ApplicationController
  def new
    @user = User.new
    render layout: 'static_pages'
  end

  def create
    if user_params[:user][:role] == 'fosterer'
      user_params[:user][:org_name] = 'NOT_ORG'
    end

    @user = User.create(user_params)
    ApplicationHelper.create_lat_and_long_for_user(@user)

    if @user.save
      Fabricate(
        :image,
        url: ApplicationHelper.random_profile_image_url,
        thumb_url: ApplicationHelper.random_profile_image_url,
        imageable_id: @user.id,
        imageable_type: 'User'
      )
      return redirect_to new_session_url
    end

    flash.now[:errors] = @user.errors.full_messages
    render :new
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
end
