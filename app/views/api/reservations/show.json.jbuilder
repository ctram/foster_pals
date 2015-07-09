json.extract! @reservation, :animal_id, :stay_id

if @reservation.stay
  json.stay do
    json.extract! @reservation.stay, :id, :check_in_date, :check_out_date, :status, :org_id, :fosterer_id
  end
end

if @reservation.animal
  json.animal do
    json.extract! @reservation.animal, :org_id, :name, :color, :weight, :species, :sex, :breed, :main_image_thumb_url, :main_image_url, :fosterer_id, :id
  end
end
