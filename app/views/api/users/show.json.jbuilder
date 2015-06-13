json.extract! @user, :id, :name, :org_name, :first_name,  :last_name, :email, :street_address, :city, :state, :zip_code, :num_animals_willing_to_foster, :about_info, :role

json.animals_as_org @user.animals_as_org do |animal|
  json.extract! animal, :org_id, :name, :color, :weight, :species, :sex, :breed, :status
end

json.animals_as_fosterer @user.animals_as_fosterer do |animal|
  json.extract! animal, :fosterer_id, :name, :color, :weight, :species, :sex, :breed, :status
end
