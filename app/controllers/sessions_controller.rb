require 'net/http'

class SessionsController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in, except: [:new, :create, :destroy, :sign_in_as_guest]
  skip_before_filter :verify_authenticity_token, :only => [:destroy]

  def new
  end

  def create
    email = params[:user][:email]
    password = params[:user][:password]

    user = User.find_by_credentials(email, password)

    if user
      sign_in(user)
      user_id = user.id
      user_role = user.class.to_s.downcase + 's'
      redirect_to "/"

    else
      flash.now[:errors] = ["Invalid username or password"]
      render :new
    end
  end

  def destroy

    sign_out
    render json: {}
  end

  def sign_in_as_guest

    carl = User.first

    coords1 = generate_random_sf_coords
    coords2 = generate_random_sf_coords

    user1 = Fabricate(
      :user,
      password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
      lat: coords1[0],
      long: coords1[1]
    )

    hsh_address = generate_postal_address user1.lat, user1.long
    set_postal_address user1, hsh_address

    user2 = Fabricate(
      :user,
      lat: coords2[0],
      long: coords2[1]
    )

    hsh_address = generate_postal_address user2.lat, user2.long
    set_postal_address user2, hsh_address

    [user1, user2].each do |user|
      user.org_name = "Guest Rescue Group"
      user.first_name = 'Gus'
      user.last_name = 'Guest'

      uri = URI("http://uifaces.com/api/v1/random")

      begin
        random_user = JSON.parse(Net::HTTP.get(uri))
        image_url = random_user['image_urls']['epic']
      rescue
        image_url = "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
      end

      image = Fabricate(
        :image,
        imageable_id: user.id,
        imageable_type: 'User',
        thumb_url: image_url
      )

      other_user = (user == user1 ? user2 : user1)

      # Set five animals with requests for fostering.
      5.times do
        animal = Fabricate(
          :animal,
          org_id: other_user.id,
          fosterer_id: user.id,
        )

        Fabricate(
          :image,
          imageable_id: animal.id,
          imageable_type: 'Animal'
        )

        stay = Fabricate(
          :stay,
          status: 'pending',
          org_id: other_user.id,
          fosterer_id: user.id,
        )

        Fabricate(
          :reservation,
          animal_id: animal.id,
          stay_id: stay.id
        )
      end

      # Set five animals in roster.
      5.times do
        animal = Fabricate(
          :animal,
          org_id: user.id,
          fosterer_id: other_user.id,
        )

        Fabricate(
          :image,
          imageable_id: animal.id,
          imageable_type: 'Animal'
        )
      end
    end

    sign_in(user1)
    redirect_to "/"
  end

  private

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
      user.street_address = '901Teresita Boulevard'
      user.city = 'San Francisco'
      user.state = 'CA'
      user.zip_code = '94127'
    else
      user.street_address += hsh_address["route"]
      user.city = hsh_address["locality"]
      user.state = hsh_address["administrative_area_level_1"]
      user.zip_code = hsh_address["postal_code"]
    end
    user.save
  end

end
