json.array! @overlapping_stays do |stay|
  json.extract! stay, :animal_id, :check_in_date, :check_out_date, :status, :org_id, :fosterer_id, :indefinite_stay
end
