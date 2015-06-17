require 'date'

Fabricator :stay do
  animal_id
  check_in_date {Date.new(2015, 1, 1)}
  check_out_date {Date.new(2015, 2, 1)}
  status
  org_id
  fosterer_id
  indefinite_stay {rand(0..1) == 1 ? 'true' : 'false'}
end
