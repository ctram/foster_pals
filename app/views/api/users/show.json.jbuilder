json.extract! @user, :id, :name, :org_name, :first_name,  :last_name, :email, :street_address, :city, :state, :zip_code, :num_animals_willing_to_foster, :about_info, :role
json.animals_as_org do
  json.array!(@user.animals_as_org)
end

# FIXME: not able to fetch @user.animals_as_org
