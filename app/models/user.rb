class User < ActiveRecord::Base

  validates_presence_of :org_name
  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :email, uniqueness: true
  validates_presence_of :num_animals_willing_to_foster
  validates_presence_of :street_address
  validates_presence_of :city
  validates_presence_of :state
  validates_presence_of :zip_code, numericality: { only_integer: true }, length: {minimum:5, maximum: 5}

  validates :password, length: {minimum: 1, allow_nil: true}

  after_initialize :ensure_session_token

  has_many(
    :stays_as_fosterer,
    class_name: 'Stay',
    foreign_key: :fosterer_id,
    primary_key: :id
  )

  has_many(
    :stays_as_org,
    class_name: 'Stay',
    foreign_key: :org_id,
    primary_key: :id
  )

  has_many(
    :animals_as_fosterer,
    class_name: 'Animal',
    foreign_key: :fosterer_id,
    primary_key: :id
  )

  has_many(
    :animals_as_org,
    class_name: 'Animal',
    foreign_key: :org_id,
    primary_key: :id
  )

  has_many :images, as: :imageable

  attr_reader :password

  def name
    if self.role == 'org'
      org_name.capitalize
    else
      first_name.capitalize + ' ' + last_name.capitalize
    end
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.valid_password?(password)
    user
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

  # TODO: extract main_image code into a module -- animal class also uses it.
  def main_image_url
    if images.empty?
      "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
    else
      images.first.url
    end
  end

  def main_image_thumb_url
    if images[1].nil?
      "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
    else
      url = images.last.thumb_url

      url = images.first.thumb_url
      url_split = url.split(',')
      url_front = url_split[0]

      image_height = url_split[1]
      image_width = url_split[2].split('/')[0]

      url_back = url_split[2].split('/').drop(1).join('/')

      image_width = "w_120"
      image_height = "h_120"

      completed_url = url_front + ',' + image_height + ',' + image_width + '/' + url_back
    end
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
