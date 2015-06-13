class Image < ActiveRecord::Base
  validates_presence_of :owner_id
  validates_presence_of :url
  validates_presence_of :thumb_url

  belongs_to :user
  belongs_to :animal

end
