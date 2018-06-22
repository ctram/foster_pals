require 'net/http'
require_relative '../app/helpers/application_helper'

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

fred = Fabricate(
  :user,
  org_name: "Fred's Place",
  first_name: 'Fred',
  password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
  email: 'f@w',
  role: 'org'
)

#################################################
# Carl's image
random_profile_image_url1 = ApplicationHelper.random_profile_image_url

Fabricate(
  :image, 
  imageable_id: carl.id, 
  imageable_type: 'User', 
  thumb_url: random_profile_image_url1
)

# Animals for Carl as a potential fosterer
1.times do
  random_image = ApplicationHelper.random_animal_image_url

  animal = Fabricate(
    :animal,
    org_id: fred.id
  )

  Fabricate(
    :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: random_image, url: random_image
  )

  stay = Fabricate(
    :stay,
    status: 'pending',
    org_id: fred.id,
    fosterer_id: carl.id
  )

  Fabricate(
    :reservation,
    animal_id: animal.id,
    stay_id: stay.id
  )
end

# Animals for Carl as org
1.times do
  random_image = ApplicationHelper.random_animal_image_url

  animal = Fabricate(
    :animal, org_id: carl.id
  )

  Fabricate(
    :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: random_image, url: random_image
  )
end
############################################

random_animal_image_url2 = ApplicationHelper.random_animal_image_url

# Fred's image
Fabricate(
  :image, 
  imageable_id: fred.id, 
  imageable_type: 'User', 
  thumb_url: random_animal_image_url2
)

# Animals for Fred as a potential fosterer
1.times do
  random_image = ApplicationHelper.random_animal_image_url

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

  Fabricate(
    :reservation,
    animal_id: animal.id,
    stay_id: stay.id
  )
end

# Animals for Fred as org
1.times do
  random_image = ApplicationHelper.random_animal_image_url

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

  Fabricate(
    :image,
    imageable_id: user.id,
    imageable_type: 'User',
    thumb_url: ApplicationHelper.random_profile_image_url
  )
end
