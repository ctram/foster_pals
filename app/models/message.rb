class Message < ActiveRecord::Base
  validates_presence_of :messageable_type
  validates_presence_of :author_id
  validates_presence_of :recipient_id
  validates_presence_of :title
  validates_presence_of :content

  belongs_to :messagable, polymorphic: true

end
