json.extract! @stay, :fosterer_id, :org_id, :check_in_date, :check_out_date, :status

json.animals @stay.animals do |animal|
  json.extract! animal, :name, :species, :sex, :breed, :color, :org_id, :fosterer_id, :weight, :status
end
