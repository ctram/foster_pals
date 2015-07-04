class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # Expose these methods to the views
  helper_method :current_user, :signed_in?

  private

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def generate_lat_and_long_for_user user
    # Generate lat and long data for all users
    api_key = ENV['GOOGLE_MAPS_API_KEY']
    gmaps_api_url = "https://maps.googleapis.com/maps/api/geocode/json?address="

    location = "#{user.street_address}, #{user.state} #{user.zip_code}"
    location = location.split.join('+')
    complete_url = gmaps_api_url + location + '&key=' + api_key
    uri = URI(complete_url)
    begin
      response = JSON.parse(Net::HTTP.get(uri))
      if response['status'] == 'ZERO_RESULTS'
        user.lat = rand * 90 * [-1, 1].sample
        user.long = rand * 180 * [-1, 1].sample
      else
        user.lat = response['results'][0]['geometry']['location']['lat']
        user.long = response['results'][0]['geometry']['location']['lng']
      end
    rescue
      user.lat = rand * 90 * [-1, 1].sample
      user.long = rand * 180 * [-1, 1].sample
    end
    user
  end

  def redirect_to_front_if_not_signed_in
    redirect_to front_url unless signed_in?
  end

  def require_signed_in!
    redirect_to new_session_url unless signed_in?
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    @current_user = user
    session[:session_token] = user.reset_token!
  end

  def sign_out
    current_user.try(:reset_token!)
    session[:session_token] = nil
  end
end

# TODO: working sign out button in the backbone navbar -- todo: hook up a button to a form that issues a delete to the sessions controller , then redirect to the sign in page.
