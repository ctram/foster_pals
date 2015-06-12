class Stay < ActiveRecord::Base
  validates_presence_of :animal_id
  validates_presence_of :fosterer_id
  validates_presence_of :organzation_id
  validates_presence_of :indefinite_stay
  validates_presence_of :check_in_date
  validates_presence_of :check_out_date
  validates_presence_of :status

  belongs_to(
    :fosterer,
    class_name: 'User',
    foreign_key: :fosterer_id,
    primary_key: :id
  )
  belongs_to(
    :organization,
    class_name: 'User',
    foreign_key: :organzation_id,
    primary_key: :id
  )
  belongs_to(
    :animal,
    class_name: 'Animal',
    foreign_key: :animal_id,
    primary_key: :id
  )
end
