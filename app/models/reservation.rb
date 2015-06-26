class Reservation < ActiveRecord::Base
  belongs_to :animal
  belongs_to :stay
end
