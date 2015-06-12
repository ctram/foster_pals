json.extract! @user, :id, :name, :org_name, :first_name,  :last_name, :email, :street_address, :city, :state, :zip_code, :num_animals_willing_to_foster, :about_info, :role

# FIXME: not able to fetch @user.animals_as_org when app accesses api
json.animals_as_org @user.animals_as_org do |animal|
  json.extract! animal, :org_id, :name, :color, :weight, :species, :sex, :breed
end
