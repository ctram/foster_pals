class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # Expose these methods to the views
  helper_method :current_user, :signed_in?

  private

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def ensure_image_url_not_broken url
    error_msg_str = "Access Denied"
    uri = URI(url)
    if Net::HTTP.get(uri).include? error_msg_str
      pictures = [
        'assets/profile-picture.jpg',
        'assets/profile-picture2.jpg',
        'assets/profile-picture3.jpg'
      ]
      url = pictures.sample
    end
    url

  # broken url sample:
  # "https://s3.amazonaws.com/uifaces/faces/twitter/fredfairclough/128.jpg"
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

  def generate_postal_address lat, long
    api_key = ENV['GOOGLE_MAPS_API_KEY']
    gmaps_api_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
    gmaps_api_url += lat.to_s + ',' + long.to_s + '&key=' + api_key
    uri = URI(gmaps_api_url)
    response = JSON.parse(Net::HTTP.get(uri))

    hsh_address = {}
    address_components = ['street_number', 'street_address', 'route', 'locality', 'administrative_area_level_1', 'postal_code' ]
    address = response["results"].first["address_components"]

    address.each do |component|
      type = component["types"].first
      if address_components.include? type
        if type == 'administrative_area_level_1'
          hsh_address[type] = component['short_name']
        else
          hsh_address[type] = component['long_name']
        end
      end
    end
    hsh_address
  end

  def generate_random_sf_coords
    sf_southern_lat = 37.712764
    sf_northern_lat = 37.780090
    sf_lat_range = sf_northern_lat - sf_southern_lat
    sf_lat = sf_lat_range * rand + sf_southern_lat

    sf_western_long = -122.496652
    sf_eastern_long = -122.400521
    sf_long_range = sf_eastern_long - sf_western_long
    sf_long = sf_long_range * rand + sf_western_long

    [sf_lat, sf_long]
  end

  def random_profile_image_url
    # uifaces api for a random profile picture
    uri = URI("http://uifaces.com/api/v1/random")

    # If UI Faces' api is broken, then set the image_url to a default image.
    begin
      random_user = JSON.parse(Net::HTTP.get(uri))

      image_url = random_user['image_urls']['epic']
      image_url = ensure_image_url_not_broken image_url
    rescue
      # backup profile picture
      # TODO: add a stock profile pictures for humans
      image_url = "assets/profile-picture3.jpg"
    end
    image_url
  end

  def redirect_to_front_if_not_signed_in
    redirect_to front_url unless signed_in?
  end

  def require_signed_in!
    redirect_to new_session_url unless signed_in?
  end

  def set_postal_address user, hsh_address
    street_number = hsh_address["street_number"]
    route = hsh_address["route"]
    city = hsh_address["locality"]
    state = hsh_address["administrative_area_level_1"]
    zip_code = hsh_address["postal_code"]

    arr_address = [street_number, route, city, state, zip_code]

    if arr_address.any? {|component| component == nil}
      # Set lat and long and address to default SF data
      user.lat = 37.733795
      user.long = -122.446747
      user.street_address = '901 Teresita Boulevard'
      user.city = 'San Francisco'
      user.state = 'CA'
      user.zip_code = '94127'
    else
      user.street_address = street_number + ' ' +  route
      user.city = city
      user.state = state
      user.zip_code = zip_code
    end
    user.save
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
