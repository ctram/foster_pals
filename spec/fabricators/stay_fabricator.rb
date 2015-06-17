require 'date'

Fabricator :stay do
  animal_id {Faker::Number.digit.to_i }
  check_in_date {Date.new(2015, 1, 1)}
  check_out_date {Date.new(2015, 2, 1)}
  org_id {Faker::Number.digit.to_i }
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
  fosterer_id {Faker::Number.digit.to_i }
  indefinite_stay {rand(0..1) == 1 ? 'true' : 'false'}
end
