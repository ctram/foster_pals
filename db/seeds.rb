# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# 10.times do
#   Fabricate(:user)
# end
#
# 10.times do
#   Fabricate(:animal)
# end
#
# carl = Fabricate(:user, org_name: "Carl's Place")
#
# 10.times do
#   Fabricate(:animal, org_id: carl.id)
# end

# Carl's place password_digest : $2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y -> 'w'

Fabricate(
  :user,
  org_name: "Carl's Place",
  first_name: 'Carl',
  password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
  email: 'w@w',
  role: 'org'
)

10.times do
  Fabricate(:animal, org_id: 1)
end
