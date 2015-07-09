require 'net/http'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

## HELPERS ###################################################################

## Sometimes UI face's image url's are broken - if so, give the user a default profile picture.
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

## END HELPERS ######################################################


############################################
# Carl's place password_digest : $2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y -> 'w'
carl = Fabricate(
  :user,
  org_name: "Chad's Rescue",
  first_name: 'Chad',
  password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
  email: 'c@w',
  role: 'org',
  lat: 37.733795,
  long: -122.446747

)

hsh_address = generate_postal_address carl.lat, carl.long
set_postal_address carl, hsh_address

fred = Fabricate(
  :user,
  org_name: "Fred's Place",
  first_name: 'Fred',
  password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
  email: 'f@w',
  role: 'org',
  lat: 37.733795,
  long: -122.446747

)

hsh_address = generate_postal_address fred.lat, fred.long
set_postal_address fred, hsh_address


#################################################
# Carl's image
Fabricate(
  :image, imageable_id: carl.id, imageable_type: 'User', thumb_url: "https://s3.amazonaws.com/uifaces/faces/twitter/carlfairclough/128.jpg"
)

carl.main_image_thumb_url = ensure_image_url_not_broken carl.main_image_thumb_url

# Animals for Carl as a potential fosterer
3.times do
  animal = Fabricate(
    :animal,
    org_id: fred.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )

  stay = Fabricate(
    :stay,
    status: 'pending',
    org_id: fred.id,
    fosterer_id: carl.id
  )

  reservation = Fabricate(
    :reservation,
    animal_id: animal.id,
    stay_id: stay.id
  )
end

# Animals for Carl as org
3.times do
  animal = Fabricate(
    :animal, org_id: carl.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )
end
############################################

# Fred's image
Fabricate(
  :image, imageable_id: fred.id, imageable_type: 'User', thumb_url: "https://s3.amazonaws.com/uifaces/faces/twitter/fredfairclough/128.jpg"
)

fred.main_image_thumb_url = ensure_image_url_not_broken fred.main_image_thumb_url


# Animals for Fred as a potential fosterer
3.times do
  animal = Fabricate(
    :animal,
    org_id: carl.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )

  stay = Fabricate(
    :stay,
    status: 'pending',
    org_id: carl.id,
    fosterer_id: fred.id
  )

  reservation = Fabricate(
    :reservation,
    animal_id: animal.id,
    stay_id: stay.id
  )
end

# Animals for Fred as org
3.times do
  animal = Fabricate(
    :animal, org_id: fred.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )
end

########################################################################
# 30 seed users

30.times do
  user = Fabricate(
    :user
  )

  hsh_address = generate_postal_address user.lat, user.long
  set_postal_address user, hsh_address

  #
  # # uifaces api for a random profile picture
  # uri = URI("http://uifaces.com/api/v1/random")
  #
  # # If UI Faces' api is broken, then set the image_url to a default image.
  # begin
  #   random_user = JSON.parse(Net::HTTP.get(uri))
  #
  #   image_url = random_user['image_urls']['epic']
  #   image_url = ensure_image_url_not_broken image_url
  # rescue
  #   # backup profile picture
  #   # TODO: add a stock profile pictures for humans
  #   image_url = "assets/profile-picture3.jpg"
  # end

  image_url = random_profile_image_url

  Fabricate(
    :image,
    imageable_id: user.id,
    imageable_type: 'User',
    thumb_url: image_url
  )

end

# 39.443837207487924,-103.73344211601939
