class Message < ActiveRecord::Base
  validates_presence_of :messageable_type
  validates_presence_of :author_id
  validates_presence_of :recipient_id
  validates_presence_of :title
  validates_presence_of :content

  belongs_to(
    :author,
    class_name: 'User',
    foreign_key: :author_id,
    primary_key: :id
  )

  belongs_to(
    :recipient,
    class_name: 'User',
    foreign_key: :recipient_id,
    primary_key: :id
  )
end
