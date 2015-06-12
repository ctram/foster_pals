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

10.times do
  Fabricate(:animal, org_id: 1)
end
