require 'net/http'
require 'json'

class Api::UsersController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in, except: [:new, :create]

  def check_overlapping_stays
    stay = Stay.find(params[:stay_id])
    @overlapping_stays = current_user.overlapping_pending_stays(stay)
    render :check_overlapping_stays
  end

  def edit
    @user = User.find(params[:id])
    render :show
  end

  def filter_by_location
    viewport_bounds = params[:viewport_bounds]

    lower_long = viewport_bounds[:long][0].to_f
    upper_long = viewport_bounds[:long][1].to_f

    lower_lat = viewport_bounds[:lat][0].to_f
    upper_lat = viewport_bounds[:lat][1].to_f

    @users = User.all.select do |user|
      user.lat.between?(lower_lat, upper_lat) && user.long.between?(lower_long, upper_long)
    end

    render :filter_by_location
  end

  def show
    @user = User.find(params[:id])
    @animals = @user.animals_as_org
    render :show
  end

  def index
    if params[:viewport_bounds]
      viewport_bounds = params[:viewport_bounds]

      lower_long = viewport_bounds[:long][0].to_f
      upper_long = viewport_bounds[:long][1].to_f

      lower_lat = viewport_bounds[:lat][0].to_f
      upper_lat = viewport_bounds[:lat][1].to_f

      @users = User.all.select do |user|
        user.lat.between?(lower_lat, upper_lat) && user.long.between?(lower_long, upper_long)
      end

      return render :filter_by_location
    end

    @users = User.all
    render :index
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params) ? render(:show) : render(@user.errors.full_messages)
  end

  # TODO: move update_about_info into #update() -- redundant
  def update_about_info
    user_id = params[:user][:id]
    about_info = params[:user][:about_info]
    user = User.find_by_id(user_id)
    user.update(about_info: about_info)
    render :show
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
      :about_info
    )
  end
end
