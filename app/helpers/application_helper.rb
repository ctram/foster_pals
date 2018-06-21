# TODO: move this into concerns?
require_relative './errors'

module ApplicationHelper
  def self.ensure_image_url_not_broken(url)
    error_msg_str = 'Access Denied'
    uri = URI(url)
    if Net::HTTP.get(uri).include?(error_msg_str)
      pictures = [
        'assets/profile-picture.jpg',
        'assets/profile-picture2.jpg',
        'assets/profile-picture3.jpg'
      ]
      url = pictures.sample
    end
    url
    # broken url sample:
    # 'https://s3.amazonaws.com/uifaces/faces/twitter/fredfairclough/128.jpg'
  end

  def self.random_profile_image_url
    # uifaces api for a random profile picture
    uri = URI('http://uifaces.com/api/v1/random')

    # If UI Faces' api is broken, then set the image_url to a default image.
    begin
      random_user = JSON.parse(Net::HTTP.get(uri))
      image_url = random_user['image_urls']['epic']
      image_url = ensure_image_url_not_broken(image_url)
    rescue StandardError
      # backup profile picture
      # TODO: add a stock profile pictures for humans
      image_url = 'assets/profile-picture3.jpg'
    end
    image_url
  end

  def self.random_animal_image
    path = 'assets/dogs/'
    image = [
      '035bbe68fe79229568cab6abcb5232a9.jpg',
      '0d807e84d6479e70a66ef11994491557.jpg',
      '213291beae8a24c49293f3096d89096b.jpg',
      '2c979bfe49db8a8b6f9947f9a30af9c7.jpg',
      '324234234.jpg',
      '3d36ca112cd1089caae9f4407e8d9c2a.jpg',
      '408984e69daa7b91ed36a25517d2d958.jpg',
      '48a1c7d6e976076fb538cbe57497292d.jpg',
      '4a3d8f5ce7e652fc58852a07dc1b33b1.jpg',
      '5284912be436e28ea418a55f502f95fc.jpg',
      '58dcbdad45fadd681364f887a578d1f5.jpg',
      '5aee907a84347e1c3d018e14b2f3f67d.jpg',
      '693f025228202e1a9c2f75d21461ac2e.jpg',
      '6a31b892a467425e810b5b7a83e86cf4.jpg',
      '6a7cd52bd86fb11523e2562fe7f63b7e.jpg',
      '6afa2c688867e33640a8782f8d2fd44b.jpg',
      '6bffcbc37b486fc461aebc06ddca046d.jpg',
      '6cfebe6ab36489bd5925c744eed07727.jpg',
      '712774fff606398fd714267c818d0bf5.jpg',
      '71a44864d86398d2d640d31e60b9e43c.jpg',
      '7264b06b95b95d65627f5e8764887757.jpg',
      '728dd83fcee334cff88817c7a40294d4.jpg',
      '7355dca56206efdf99f38588878fb6e7.jpg',
      '75083518757164472_mFMq4bI1_c_large.jpg',
      '76179297bf80406a4ad804a22d0a885e.jpg',
      '7ac1c7a80124a65b264541b3bdbc9cb3.jpg',
      '7e9b56969839b0d6345e25a812f68ed9_0.jpg',
      '83a27da3115e0f518609828ce7e651f2.jpg',
      '88e0b0ad652cf42a811803bfc67cdff4.jpg',
      '8b4a5bcf9b6a995a0c026ac14c7fb3ba.jpg',
      '8e0de51db09fbf96de30212b561674b6_1.jpg',
      '9e465fb8a3f60cac0616bd667342f98a.jpg',
      'a0821e1ceeda425a4337f5b55956e391.jpg',
      'a3ef5504def30396a9b4bc6ead7d48a7.jpg',
      'a5b32e7b38f30b361915f23711e412a0.jpg',
      'a65febdebf0836e784ebe4a4fd95bab7.jpg',
      'b054f9bf75fe74a38995cb0ccc240af5.jpg',
      'b05967dfb43f08adfdb30f2f6a4c665d.jpg',
      'b97c3ba83fa25ce6c36ac3c94428d3f6.jpg',
      'ca51696d167c71849455078f0ce69d58.jpg',
      'd5b799dcbcf5522054d3e2c52763f861.jpg',
      'de6d4f8d06950bd14937fda15b56d369.jpg',
      'e98d103200721f45ec1086dee4f5136e.jpg',
      'f56455b05487258decdeff471e39d4ec.jpg',
      'f6ae67ff71124f5bde6b9cb7356dbb56.jpg',
      'fbd8a08760e76a0a0430671c2d1068b9.jpg',
      'fc8685f91998549039a349910d6a7a71.jpg'
    ].sample
    path + image
  end

  # Ask Google for an address at the geographical coordinates, returns the address
  # @params lat [Float]
  # @params long [Float]
  # @return address [Hash]
  def self.address_from_lat_and_long(lat, long)
    api_key = ENV['GOOGLE_MAPS_API_KEY']
    gmaps_api_url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
    gmaps_api_url += lat.to_s + ',' + long.to_s + '&key=' + api_key
    uri = URI(gmaps_api_url)
    address = {}

    response = JSON.parse(Net::HTTP.get(uri))
    puts "response is #{response}"
    raise(NoResponseError, 'bad response from google maps') if response.nil? || response['results'].empty?

    response['results'].first['address_components'].each do |component|
      type = component['types'].first
      address[type] = type == 'administrative_area_level_1' ? component['short_name'] : component['long_name']
    end
    raise(IncompleteAddressError, 'incomplete postal address') unless address_valid?(address)
    address
  end

  # @param zip_code [String]
  # @return [Hash] The latitude and longitude of the zip code
  def self.lat_and_long_from_zip_code(zip_code)
    api_key = ENV['GOOGLE_MAPS_API_KEY']
    gmaps_api_url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    complete_url = gmaps_api_url + "+#{zip_code}" + '&key=' + api_key
    uri = URI(complete_url)
    response = JSON.parse(Net::HTTP.get(uri))
    raise(GoogleMapsGetLatLongError, 'no latitude and longitude data found for given postal address') if response['status'] == 'ZERO_RESULTS'
    {
      lat: response['results'].first['geometry']['location']['lat'], 
      long: response['results'].first['geometry']['location']['lng'] 
    }
  end

  # @param address [Hash]
  # @return [Boolean]
  def self.address_valid?(address = {})
    puts "need these keys: street_number route locality administrative_area_level_1 postal_code"
    puts "keys are actually: #{address.keys}"

    %w[street_number route locality administrative_area_level_1 postal_code ].all? do |key|
      address.key?(key) && address[key]
    end
  end

  # @param user [User]
  # @param num_tries_limit [Integer] Number of tries to attempt before failing
  # @return user [User]
  def self.create_lat_and_long_for_user(user, num_tries_limit = 100)
    num_tries = 0
    begin
      lat, long = lat_and_long_from_zip_code(user.zip_code).values_at :lat, :long
      address = address_from_lat_and_long(lat, long)
      puts "end of begin block"
    rescue GoogleMapsGetLatLongError, IncompleteAddressError => e
      puts "there was an error from the rescue #{e}"
      user.update_attributes(zip_code: Faker::Address.zip_code)
      num_tries += 1
      raise('cannot generate latitude and longitude') if num_tries == num_tries_limit
      retry
    end
    puts "last thing, address is #{address}"
    user.update_attributes( 
      street_address: "#{address['street_number']} #{address['route']}",
      city: address['locality'],
      state: address['administrative_area_level_1'],
      lat: lat,
      long: long
    )
    user
  end
end
