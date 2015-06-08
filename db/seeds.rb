# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

w = User.create(
  password_digest: 'asdasd',
  session_token: 'asdasd',
  role: 'fosterer',
  first_name: 'w',
  last_name: 'w',
  email:'w@example.com',
  types_of_animals_at_location: 'Dog',
  num_native_animals_at_location: 1,
  num_animals_willing_to_foster: 1,
  street_address: 'w road',
  city: 'w city',
  state: 'ca',
  zip_code: '29304'
)

mssg = Message.create(
  messageable_type: 'message',
  author_id: 1,
  recipient_id: 1,
  title: 'First message',
  content: 'Some good content.'
)
