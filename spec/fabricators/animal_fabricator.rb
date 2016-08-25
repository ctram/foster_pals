Fabricator :animal do
  name {Faker::Name.first_name}
  species { rand(0..1) == 1 ? 'Dog' : 'Cat'}
  sex { rand(0..1) == 1 ? 'm' : 'f'}
  breed do
    breeds = [
      'Pekingese',
      'Labrador',
      'Poodle',
      'Bulldog'
    ]
    breeds.sample
  end
  color {Faker::Commerce.color}
  weight { Faker::Number.number(2)}
end
