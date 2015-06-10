class Fosterer < ActiveRecord::Base
  validates_presence_of :password_digest
  validates_presence_of :session_token
  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :email
  validates_presence_of :num_animals_willing_to_foster
  validates_presence_of :street_address
  validates_presence_of :city
  validates_presence_of :state
  validates_presence_of :zip_code

  validates :password, length: {minimum: 1, allow_nil: true}

  has_many :stays
  has_many :animals




  attr_reader :password

  def self.find_by_credentials(email, password)
    fosterer = Fosterer.find_by(email: email)
    return nil unless fosterer && fosterer.valid_password?(password)
    fosterer
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
