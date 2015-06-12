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
end
