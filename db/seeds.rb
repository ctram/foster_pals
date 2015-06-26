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

fred = Fabricate(
  :user,
  org_name: "Fred's Place",
  first_name: 'Fred',
  password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
  email: 'f@w',
  role: 'org',
  lat: 37.733795,
  long: -122.446747

)

#################################################
# Carl's image
Fabricate(
  :image, imageable_id: carl.id, imageable_type: 'User', thumb_url: "https://s3.amazonaws.com/uifaces/faces/twitter/carlfairclough/128.jpg"
)

# Animals for Carl as a potential fosterer
10.times do
  animal = Fabricate(
    :animal,
    org_id: fred.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )

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
10.times do
  animal = Fabricate(
    :animal, org_id: carl.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )
end
############################################

# Fred's image
Fabricate(
  :image, imageable_id: fred.id, imageable_type: 'User', thumb_url: "https://s3.amazonaws.com/uifaces/faces/twitter/fredfairclough/128.jpg"
)

# Animals for Fred as a potential fosterer
10.times do
  animal = Fabricate(
    :animal,
    org_id: carl.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
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
10.times do
  animal = Fabricate(
    :animal, org_id: fred.id
  )

  Fabricate(
  :image, imageable_id: animal.id, imageable_type: 'Animal', thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )
end
