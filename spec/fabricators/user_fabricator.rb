require_relative '../../app/helpers/application_helper'

Fabricator :user do
  password_digest { Faker::Internet.password }
  session_token { Faker::Internet.password }
  role { rand(0..1) == 1 ? 'fosterer' : 'org' }
  org_name { Faker::Company.name }
  first_name { Faker::Name.first_name }
  last_name { Faker::Name.last_name }
  email { Faker::Internet.email }
  street_address { Faker::Address.street_name }
  city { Faker::Address.city }
  state { Faker::Address.state_abbr }
  zip_code { Faker::Address.zip_code }
  about_info { Faker::Lorem.paragraph(10) }
  after_create { |user| ApplicationHelper.create_lat_and_long_for_user(user) }
end
