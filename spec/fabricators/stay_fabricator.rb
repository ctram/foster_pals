require 'date'

Fabricator :stay do
  check_in_date { Date.new(2015, 6, 24) }
  check_out_date { Date.new(2015, 7, 24) }
  org_id { Faker::Number.digit.to_i }
  fosterer_id { Faker::Number.digit.to_i }
  status do
    case [1, 2, 3].sample
    when 1
      'pending'
    when 2
      'denied'
    when 3
      'confirmed'
    end
  end
end
