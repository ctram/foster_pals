class User < ActiveRecord::Base
  validates_presence_of :org_name, if: proc { |a| a.org? }
  validates_presence_of :email, uniqueness: true
  validates :password, length: { minimum: 1, allow_nil: true }
  validates_presence_of :first_name, unless: proc { |a| a.org? }
  validates_presence_of :last_name, unless: proc { |a| a.org? }
  validates_presence_of :street_address
  validates_presence_of :city
  validates_presence_of :state
  validates_presence_of :zip_code, numericality: { only_integer: true }, length: { minimum: 5, maximum: 5 }

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

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.valid_password?(password)
    user
  end

  def deny_overlapping_stays(stay)
    ol_stays = overlapping_pending_stays
    return unless ol_stays.include?(stay)
    ol_stays.delete stay
    ol_stays.each do |inner_stay|
      inner_stay.update(status: 'denied')
    end
  end

  # TODO: extract main_image code into a module -- animal class also uses it.
  def main_image_url
    images.empty? ? 'http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png' : images.first.url
  end

  def main_image_thumb_url
    images.empty? ? 'http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png' : images.last.thumb_url
  end

  def main_image_thumb_url=(url)
    images.last.update(thumb_url: url)
  end

  def name
    role == 'org' ? org_name.capitalize : first_name.capitalize + ' ' + last_name.capitalize
  end

  # TODO: re-code overlapping stays as a custom validation in the stay model, i.e. when a stay's status is updated to 'confirmed', the validation denies all other stays.
  def overlapping_pending_stays(stay)
    p_stays = pending_stays.reject do |other_stay|
      other_stay.id == stay.id
    end

    return [] if p_stays.empty?

    overlapping_stays_arr = []

    p_stays.each do |other_stay|
      if overlapping_stays? stay, other_stay
        overlapping_stays_arr.push other_stay
      end
    end

    overlapping_stays_arr
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def pending_stays
    stays_as_fosterer.where(status: 'pending')
  end

  def reset_token!
    session_token = SecureRandom.urlsafe_base64(16)
    save
    session_token
  end

  def valid_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def org?
    role == 'org'
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def overlapping_stays?(stay1, stay2)
    stay1.check_in_date <= stay2.check_out_date || stay1.check_out_date >= stay2.check_in_date
  end
end
