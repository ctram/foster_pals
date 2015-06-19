class Api::SearchController < ApplicationController
  def location_to_geocode
    search_location = params[:search_location]

    api_key = ENV['GOOGLE_MAPS_API_KEY']
    gmaps_api_url = "https://maps.googleapis.com/maps/api/geocode/json?address="

    search_location = search_location.split.join('+')
    complete_url = gmaps_api_url + search_location + '&key=' + api_key
    uri = URI(complete_url)
    response = JSON.parse(Net::HTTP.get(uri))
    render json: response
  end

end
