json.array! @users do |user|
  json.extract! user, :id, :name, :org_name, :first_name,  :last_name, :email, :street_address, :city, :state, :zip_code, :about_info, :role, :main_image_thumb_url, :lat, :long
end
