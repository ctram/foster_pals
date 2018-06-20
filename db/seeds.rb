require 'net/http'
require_relative '../app/helpers/application_helper'

class Helper
  # borrow helpers
  include ApplicationHelper
end

helper = Helper.new

############################################
# Carl's place password_digest : $2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y -> 'w'
carl = Fabricate(
  :user,
  org_name: "Chad's Rescue",
  first_name: 'Chad',
  password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
  email: 'c@w',
  role: 'org'
)
helper.set_postal_address_for_user carl

fred = Fabricate(
  :user,
  org_name: "Fred's Place",
  first_name: 'Fred',
  password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
  email: 'f@w',
  role: 'org'
)
helper.set_postal_address_for_user fred

#################################################
# Carl's image
Fabricate(
  :image, imageable_id: carl.id, imageable_type: 'User', thumb_url: "https://s3.amazonaws.com/uifaces/faces/twitter/carlfairclough/128.jpg"
)

carl.main_image_thumb_url = helper.ensure_image_url_not_broken carl.main_image_thumb_url

# Animals for Carl as a potential fosterer
1.times do
  random_image = helper.random_animal_image

  animal = Fabricate(
    :animal,
    org_id: fred.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: random_image, url: random_image
  )

  # stock animal image - cartoon dog.
  # thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"

  stay = Fabricate(
    :stay,
    status: 'pending',
    org_id: fred.id,
    fosterer_id: carl.id
  )

  reservation = Fabricate(
    :reservation,
    animal_id: animal.id,
    stay_id: stay.id
  )
end

# Animals for Carl as org
1.times do
  random_image = helper.random_animal_image

  animal = Fabricate(
    :animal, org_id: carl.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: random_image, url: random_image
  )
end
############################################

# Fred's image
Fabricate(
  :image, imageable_id: fred.id, imageable_type: 'User', thumb_url: "https://s3.amazonaws.com/uifaces/faces/twitter/fredfairclough/128.jpg"
)

fred.main_image_thumb_url = helper.ensure_image_url_not_broken fred.main_image_thumb_url


# Animals for Fred as a potential fosterer
1.times do
  random_image = helper.random_animal_image

  animal = Fabricate(
    :animal,
    org_id: carl.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: random_image, url: random_image
  )

  stay = Fabricate(
    :stay,
    status: 'pending',
    org_id: carl.id,
    fosterer_id: fred.id
  )

  reservation = Fabricate(
    :reservation,
    animal_id: animal.id,
    stay_id: stay.id
  )
end

# Animals for Fred as org
1.times do
  random_image = helper.random_animal_image

  animal = Fabricate(
    :animal, org_id: fred.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: random_image, url: random_image
  )
end

########################################################################
# 30 seed users

30.times do
  user = Fabricate(
    :user
  )

  helper.set_postal_address_for_user user

  image_url = helper.random_profile_image_url

  Fabricate(
    :image,
    imageable_id: user.id,
    imageable_type: 'User',
    thumb_url: image_url
  )
end