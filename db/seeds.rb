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

3.times do
  animal = Fabricate(
    :animal, org_id: carl.id
  )

  Fabricate(
    :image, owner_id: animal.id, thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
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

3.times do
  animal = Fabricate(
    :animal, org_id: frosty.id
  )

  Fabricate(
    :image, owner_id: animal.id, thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )
end

############################################

# Fosterers
10.times do
  user = Fabricate(
    :user,
    role: 'fosterer'
  )

  3.times do
    animal = Fabricate(
      :animal, fosterer_id: user.id
    )

    Fabricate(
      :image, owner_id: animal.id, thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
    )
  end
end

############################################

# Orgs
10.times do
  user = Fabricate(
    :user,
    role: 'org'
  )

  3.times do
    animal = Fabricate(
      :animal, org_id: user.id
    )

    Fabricate(
      :image, owner_id: animal.id, thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
    )
  end
end
