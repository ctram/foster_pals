# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

# Carl's place password_digest : $2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y -> 'w'

Fabricate(
  :user,
  org_name: "Carl's Place",
  first_name: 'Carl',
  password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
  email: 'c@w',
  role: 'org'
)

frosty = Fabricate(
  :user,
  org_name: "Frosty's Place",
  password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
  email: 'f@w',
  role: 'org'
)

10.times do
  animal = Fabricate(
    :animal, org_id: frosty.id
  )

  Fabricate(
  :image, owner_id: animal.id, thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
  )
end




2.times do
  user = Fabricate(
    :user,
    password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
    role: 'org'
  )

  10.times do
    animal = Fabricate(
      :animal, fosterer_id: user.id
    )

    Fabricate(
    :image, owner_id: animal.id, thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
    )
  end
end

2.times do
  user = Fabricate(
    :user,
    password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
    role: 'fosterer'
  )

  10.times do
    animal = Fabricate(
      :animal, fosterer_id: user.id
    )

    Fabricate(
    :image, owner_id: animal.id, thumb_url: "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
    )
  end
end
