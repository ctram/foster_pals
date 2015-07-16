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

  def random_animal_image
    path = 'assets/dogs/'
    image = [
      '035bbe68fe79229568cab6abcb5232a9.jpg',
      '213291beae8a24c49293f3096d89096b.jpg',
      '2c979bfe49db8a8b6f9947f9a30af9c7.jpg',
      '3d36ca112cd1089caae9f4407e8d9c2a.jpg',
      '408984e69daa7b91ed36a25517d2d958.jpg',
      '48a1c7d6e976076fb538cbe57497292d.jpg',
      '4a3d8f5ce7e652fc58852a07dc1b33b1.jpg',
      '5284912be436e28ea418a55f502f95fc.jpg',
      '5aee907a84347e1c3d018e14b2f3f67d.jpg',
      '6a31b892a467425e810b5b7a83e86cf4.jpg',
      '6afa2c688867e33640a8782f8d2fd44b.jpg',
      '712774fff606398fd714267c818d0bf5.jpg',
      '728dd83fcee334cff88817c7a40294d4.jpg',
      '75083518757164472_mFMq4bI1_c_large.jpg',
      '76179297bf80406a4ad804a22d0a885e.jpg',
      '7ac1c7a80124a65b264541b3bdbc9cb3.jpg',
      '7e9b56969839b0d6345e25a812f68ed9_0.jpg',
      '83a27da3115e0f518609828ce7e651f2.jpg',
      '8e0de51db09fbf96de30212b561674b6_1.jpg',
      'a65febdebf0836e784ebe4a4fd95bab7.jpg',
      'b97c3ba83fa25ce6c36ac3c94428d3f6.jpg',
      'ca51696d167c71849455078f0ce69d58.jpg',
      'd5b799dcbcf5522054d3e2c52763f861.jpg',
      'f6ae67ff71124f5bde6b9cb7356dbb56.jpg',
      'tumblr_ltgeds1Mgt1qibwfwo1_400.jpg'
    ].sample
    path + image
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
