# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

# Carl's place password_digest : $2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y -> 'w'

############################################
carl = Fabricate(
  :user,
  org_name: "Carl's Place",
  first_name: 'Carl',
  password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
  email: 'c@w',
  role: 'org',
  lat: 37.733795,
  long: -122.446747

)

# Carl's image
Fabricate(
  :image, imageable_id: carl.id, imageable_type: 'User', thumb_url: "https://s3.amazonaws.com/uifaces/faces/twitter/carlfairclough/128.jpg"
)

# Animals for Carl as a potential fosterer
10.times do
  animal = Fabricate(
    :animal
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )
  
  stay = Fabricate(
    :stay,
    status: 'pending'
  )

  reservation = Fabricate(
    :reservation,
    animal_id: animal.id,
    stay_id: stay.id
  )
end

# Animals for Carl as org
10.times do
  animal = Fabricate(
    :animal, org_id: carl.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )
end
############################################
#
# frosty = Fabricate(
#   :user,
#   org_name: "Frosty's Place",
#   password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
#   email: 'f@w',
#   role: 'org',
#   lat: 37.3393857,
#   long: -121.8949555
# )
#
# # Image for Frosty
# Fabricate(
#   :image, imageable_id: frosty.id, imageable_type: 'User', thumb_url: "https://s3.amazonaws.com/uifaces/faces/twitter/mimobase/128.jpg"
# )
#
# 10.times do
#   animal = Fabricate(
#     :animal,
#     fosterer_id: frosty.id,
#     org_id: carl.id,
#     status: '-'
#   )
#
#   stay = Fabricate(
#     :stay,
#     animal_id: animal.id,
#     fosterer_id: frosty.id,
#     org_id: carl.id,
#     status: 'pending',
#   )
#
#   Fabricate(
#   :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
#   )
# end
#
# 10.times do
#   animal = Fabricate(
#     :animal,
#     fosterer_id: carl.id,
#     org_id: frosty.id,
#     status: '-'
#   )
#
#   Fabricate(
#   :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
#   )
# end
