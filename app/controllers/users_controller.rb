require_relative '../helpers/application_helper'

class UsersController < ApplicationController
  def new
    @user = User.new
    @current_fragment_location = '/register'
    render layout: 'static_pages'
  end

  def create
    begin
      @user = User.create(user_params)
    rescue ActiveRecord::RecordNotUnique
      flash.now[:alert] = ['Email must be unique']
    rescue StandardError => e
      flash.now[:alert] = [e]
    end

    return render(:new) unless flash.alert.nil? || flash.alert.empty?

    unless @user.errors.full_messages.empty?
      flash.now[:alert] = @user.errors.full_messages
      return render :new
    end

    ApplicationHelper.create_lat_and_long_for_user(@user)
    random_profile_image_url = ApplicationHelper.random_profile_image_url

    Fabricate(
      :image,
      url: random_profile_image_url,
      thumb_url: random_profile_image_url,
      imageable_id: @user.id,
      imageable_type: 'User'
    )
    flash.notice = ['Registration Successful! Please Sign In']
    redirect_to new_session_url
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
