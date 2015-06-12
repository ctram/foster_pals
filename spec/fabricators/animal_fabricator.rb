Fabricator :animal do
  name {Faker::Name.first_name}
  species { rand(0..1) == 1 ? 'Dog' : 'Cat'}
  sex { rand(0..1) == 1 ? 'm' : 'f'}
  breed {Faker::Internet.password}
  color {Faker::Commerce.color}
  org_id {Faker::Number.digit}
  fosterer_id {Faker::Number.digit}
  weight { Faker::Number.number(2)}
end
