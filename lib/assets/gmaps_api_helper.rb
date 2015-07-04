module GmapsApiHelper
  def generate_postal_address lat, long
    api_key = ENV['GOOGLE_MAPS_API_KEY']
    gmaps_api_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="
    gmaps_api_url += lat.to_s + ',' + long.to_s + '&key=' + api_key
    uri = URI(gmaps_api_url)
    response = JSON.parse(Net::HTTP.get(uri))
    address = response["results"].first["address_components"]

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
    user.street_address = hsh_address[:street_num] + ' ' + hsh_address[:street_address]
    user.city = hsh_address[:city]
    user.state = hsh_address[:state]
    user.zip_code = hsh_address[:zip_code]
    user.save
  end

end
