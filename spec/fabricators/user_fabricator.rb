Fabricator :user do
  password_digest { Faker::Internet.password }
  session_token { Faker::Internet.password }
  role { rand(0..1) == 1 ? 'fosterer' : 'org' }
  org_name { Faker::Name.first_name }
  first_name { Faker::Name.first_name }
  last_name { Faker::Name.last_name }
  email { Faker::Internet.email }
  street_address { Faker::Address.street_name }
  city { Faker::Address.city }
  state { Faker::Address.state_abbr }
  zip_code { Faker::Address.zip_code }
  about_info { Faker::Lorem.paragraph(10) }
  lat do
    us_southern_lat = 32.615831
    us_northern_lat = 41.306330
    us_lat_range = us_northern_lat - us_southern_lat
    us_lat = us_lat_range * rand + us_southern_lat
  end

  long do
    us_western_long = -115.031388
    us_eastern_long = -82.893386
    us_long_range = us_eastern_long - us_western_long
    us_long = us_long_range * rand + us_western_long
  end
end
