json.extract! @user, :id, :name, :org_name, :first_name,  :last_name, :email, :street_address, :city, :state, :zip_code, :num_animals_willing_to_foster, :about_info, :role, :main_image_thumb_url

json.animals_as_org @user.animals_as_org do |animal|
  json.extract! animal, :org_id, :name, :color, :weight, :species, :sex, :breed, :status, :main_image_thumb_url, :main_image_url, :fosterer_id, :id
end

json.animals_as_fosterer @user.animals_as_fosterer do |animal|
  json.extract! animal, :fosterer_id, :name, :color, :weight, :species, :sex, :breed, :status, :main_image_thumb_url, :main_image_url, :org_id, :id
end

json.stays_as_fosterer @user.stays_as_fosterer do |stay|
  json.extract! stay, :animal_id, :check_in_date, :check_out_date, :status, :org_id, :indefinite_stay
end

json.stays_as_org @user.stays_as_org do |stay|
  json.extract! stay, :animal_id, :check_in_date, :check_out_date, :status, :fosterer_id, :indefinite_stay
end
