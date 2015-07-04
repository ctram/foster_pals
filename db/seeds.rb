# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

#### gmaps api helpers ######################################################
def generate_postal_address lat, long
  api_key = ENV['GOOGLE_MAPS_API_KEY']
  gmaps_api_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
  gmaps_api_url += lat.to_s + ',' + long.to_s + '&key=' + api_key
  uri = URI(gmaps_api_url)
  response = JSON.parse(Net::HTTP.get(uri))
  address = response["results"].first["address_components"]
  debugger
  hsh_address = {}
  hsh_address[:street_num] = address[0]["long_name"]
  hsh_address[:street_address] = address[1]["long_name"]
  hsh_address[:city] = address[3]["long_name"]
  hsh_address[:state] = address[5]["short_name"]
  hsh_address[:zip_code] = address[7]["short_name"]
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
  debugger
  user.street_address = hsh_address[:street_num] + ' ' + hsh_address[:street_address]
  user.city = hsh_address[:city]
  user.state = hsh_address[:state]
  user.zip_code = hsh_address[:zip_code]
  user.save
end

## End gmaps api helpers ####################################################

# Carl's place password_digest : $2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y -> 'w'

############################################
carl = Fabricate(
  :user,
  org_name: "Carl's Place",
  first_name: 'Carl',
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

# Animals for Carl as a potential fosterer
10.times do
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
10.times do
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

# Animals for Fred as a potential fosterer
10.times do
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
10.times do
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


  # uifaces api for a random profile picture
  uri = URI("http://uifaces.com/api/v1/random")

  begin
    random_user = JSON.parse(Net::HTTP.get(uri))
    image_url = random_user['image_urls']['epic']
  rescue
    # backup profile picture
    # TODO: add a stock profile pictures for humans
    image_url = "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  end

  Fabricate(
    :image,
    imageable_id: user.id,
    imageable_type: 'User',
    thumb_url: image_url
  )

end
