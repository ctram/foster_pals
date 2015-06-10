class Organization < ActiveRecord::Base
  validates_presence_of :password_digest
  validates_presence_of :session_token
  validates_presence_of :name
  validates_presence_of :leader_first_name
  validates_presence_of :leader_last_name
  validates_presence_of :email, uniqueness: true
  validates_presence_of :street_address
  validates_presence_of :city
  validates_presence_of :state
  validates_presence_of :zip_code, numericality: { only_integer: true }, length: {minimum:5, maximum: 5}

  validates :password, length: {minimum: 1, allow_nil: true}

  attr_reader :password

  has_many :stays
  has_many :animals

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    organization = organization.find_by(email: email)
    return nil unless organization && organization.valid_password?(password)
    organization
  end

  def password=(password)
    byebug
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
