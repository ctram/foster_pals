json.array! @overlapping_stays do |stay|
  json.extract! stay, :check_in_date, :check_out_date, :status, :org_id, :fosterer_id, :id
end
