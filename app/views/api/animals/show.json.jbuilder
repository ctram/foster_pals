# too much json - have backbone make more fetches when needed instead having an object front load all its relationships (?)
json.extract! @animal, :org_id, :name, :color, :weight, :species, :sex, :breed, :main_image_thumb_url, :main_image_url, :fosterer_id, :id

json.images @animal.images do |image|
  json.extract! image, :url, :thumb_url
end

if @animal.fosterer
  json.fosterer do
    json.extract! @animal.fosterer, :first_name, :last_name, :email, :street_address_white_spaced, :city, :state, :zip_code, :about_info, :lat, :long, :id
  end
end

if @animal.org
  json.org do
    json.extract! @animal.org, :org_name, :first_name, :last_name, :email, :street_address_white_spaced, :city, :state, :zip_code, :about_info, :lat, :long, :id
  end
end

if @animal.stays
  json.stays @animal.stays do |stay|
    json.extract! stay, :id, :check_in_date, :check_out_date, :status, :org_id, :fosterer_id
  end
  # json.stay do
  #   json.extract! @animal.stay, :id, :animal_id, :check_in_date, :check_out_date, :status, :org_id, :fosterer_id
  # end
end
