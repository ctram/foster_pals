require 'date'

Fabricator :stay do
  # animal_id {Faker::Number.digit.to_i }
  check_in_date {Date.new(2015, 6, 24)}
  check_out_date {Date.new(2015, 7, 24)}
  org_id {Faker::Number.digit.to_i }
  fosterer_id {Faker::Number.digit.to_i }
  status do
    x = [1,2,3].sample

    case x
    when 1
      'pending'
    when 2
      'denied'
    when
      'confirmed'
    end
  end
  # indefinite_stay {rand(0..1) == 1 ? 'true' : 'false'}
end
