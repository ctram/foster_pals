Fabricator :animal do
  name {Faker::Name.first_name}
  species { rand(0..1) == 1 ? 'Dog' : 'Cat'}
  sex { rand(0..1) == 1 ? 'm' : 'f'}
  breed {Faker::Internet.password}
  color {Faker::Commerce.color}
  org_id {Faker::Number.digit}
  fosterer_id {Faker::Number.digit}
  weight { Faker::Number.number(2)}
  status {
    rand_num = rand(0..2)
    case rand_num
    when 0
      'fostered'
    when 1
      'rescued'
    else
      'adopted'
    end
  }
end
