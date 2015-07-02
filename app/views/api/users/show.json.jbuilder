json.extract! @user, :id, :name, :org_name, :first_name,  :last_name, :email, :street_address, :city, :state, :zip_code, :num_animals_willing_to_foster, :about_info, :role, :main_image_thumb_url

json.animals_as_org @user.animals_as_org do |animal|
  json.extract! animal, :org_id, :name, :color, :weight, :species, :sex, :breed, :status, :main_image_thumb_url, :main_image_url, :fosterer_id, :id
  json.stays animal.stays do |stay|
    json.extract! stay, :id, :status, :org_id, :fosterer_id, :check_in_date, :check_out_date, :fosterer, :org
  end
  # TODO: need to pull in the fosterer associated with each stay
end

json.animals_as_fosterer @user.animals_as_fosterer do |animal|
  json.extract! animal, :stays, :fosterer_id, :name, :color, :weight, :species, :sex, :breed, :status, :main_image_thumb_url, :main_image_url, :org_id, :id
end

json.stays_as_fosterer @user.stays_as_fosterer do |stay|
  json.extract! stay, :check_in_date, :check_out_date, :status, :org_id, :id
end

json.stays_as_org @user.stays_as_org do |stay|
  json.extract! stay, :check_in_date, :check_out_date, :status, :fosterer_id, :id
end
