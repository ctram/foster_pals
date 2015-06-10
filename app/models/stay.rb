class Stay < ActiveRecord::Base
  validates_presence_of :animal_id
  validates_presence_of :fosterer_id
  validates_presence_of :organzation_id
  validates_presence_of :indefinite_stay
  validates_presence_of :check_in_date
  validates_presence_of :check_out_date
  validates_presence_of :status

  belongs_to :fosterer
  belongs_to :organization
  belongs_to :animal

end
