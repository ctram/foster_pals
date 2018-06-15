class Stay < ActiveRecord::Base
  validates_presence_of :fosterer_id
  validates_presence_of :org_id
  validates_presence_of :check_in_date
  validates_presence_of :status

  belongs_to(
    :fosterer,
    class_name: 'User',
    foreign_key: :fosterer_id,
    primary_key: :id
  )
  belongs_to(
    :org,
    class_name: 'User',
    foreign_key: :org_id,
    primary_key: :id
  )

  has_many :reservations
  has_many :animals, through: :reservations
end
