class Animal < ActiveRecord::Base
  validates_presence_of :name
  validates_presence_of :species
  validates_presence_of :sex
  validates_presence_of :weight
  validates_presence_of :breed
  validates_presence_of :color

  belongs_to(
    :org,
    class_name: 'User',
    foreign_key: :org_id,
    primary_key: :id
  )

  belongs_to(
    :fosterer,
    class_name: 'User',
    foreign_key: :fosterer_id,
    primary_key: :id
  )

  has_many(
    :images,
    class_name: 'Image',
    foreign_key: :owner_id,
    primary_key: :id
  )

  def main_image_url
    self.images.first.url
  end

  def main_image_thumb_url
    self.images.first.thumb_url
  end

end
