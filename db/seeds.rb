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
  role: 'org'
)

Fabricate(
  :image, imageable_id: carl.id, imageable_type: 'User', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
)


3.times do
  animal = Fabricate(
    :animal, org_id: carl.id
  )

  Fabricate(
    :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )
end


3.times do
  animal = Fabricate(
    :animal, fosterer_id: carl.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )
end
############################################

frosty = Fabricate(
  :user,
  org_name: "Frosty's Place",
  password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
  email: 'f@w',
  role: 'org'
)

Fabricate(
  :image, imageable_id: frosty.id, imageable_type: 'User', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
)

10.times do
  animal = Fabricate(
    :animal,
    fosterer_id: frosty.id,
    org_id: carl.id,
    status: 'rescued'
  )

  stay = Fabricate(
    :stay,
    animal_id: animal.id,
    fosterer_id: frosty.id,
    org_id: carl.id,
    status: 'pending',
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )
end

10.times do
  animal = Fabricate(
    :animal,
    fosterer_id: carl.id,
    org_id: frosty.id,
    status: 'rescued'
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )
end


############################################
#
# # Fosterers
# 10.times do
#   user = Fabricate(
#     :user,
#     role: 'fosterer'
#   )
#
#   Fabricate(
#     :image, imageable_id: user.id, imageable_type: 'User', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
#   )
#
#   3.times do
#     animal = Fabricate(
#       :animal, fosterer_id: user.id
#     )
#
#     Fabricate(
#       :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
#     )
#   end
# end
#
# ############################################
#
# # Orgs
# 10.times do
#   user = Fabricate(
#     :user,
#     role: 'org'
#   )
#
#   Fabricate(
#     :image, imageable_id: user.id, imageable_type: 'User', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
#   )
#
#
#   3.times do
#     animal = Fabricate(
#       :animal, org_id: user.id
#     )
#
#     Fabricate(
#       :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
#     )
#   end
# end
