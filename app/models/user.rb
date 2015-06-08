class User < ActiveRecord::Base
  # validates_presence_of :password_digest
  # validates_presence_of :session_token
  # validates_presence_of :role
  # validates_presence_of :first_name
  # validates_presence_of :last_name
  # validates_presence_of :email
  # validates_presence_of :types_of_animals_at_location
  # validates_presence_of :num_native_animals_at_location
  # validates_presence_of :num_animals_willing_to_foster
  # validates_presence_of :street_address
  # validates_presence_of :city
  # validates_presence_of :state
  # validates_presence_of :zip_code
  # validates :password, length: {minimum: 1, allow_nil: true}

  attr_reader :password

  has_many(
    :messages,
    class_name: 'Message',
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many(
    :posts,
    class_name: 'Message',
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many(
    :comments,
    class_name: 'Message',
    foreign_key: :author_id,
    primary_key: :id
  )


end
