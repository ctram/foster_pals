class Image < ActiveRecord::Base
  validates_presence_of :imageable_id
  validates_presence_of :url
  validates_presence_of :thumb_url

  belongs_to :imageable, polymorphic: true
end
