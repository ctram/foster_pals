json.extract! @animal, :org_id, :name, :color, :weight, :species, :sex, :breed, :status, :main_image_thumb_url, :main_image_url, :fosterer_id, :id

json.images @animal.images do |image|
  json.extract! image, :url, :thumb_url
end
