class User < ActiveRecord::Base
  validates_presence_of :org_name
  validates_presence_of :email, uniqueness: true
  validates :password, length: {minimum: 1, allow_nil: true}
  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :street_address
  validates_presence_of :city
  validates_presence_of :state
  validates_presence_of :zip_code, numericality: { only_integer: true }, length: {minimum:5, maximum: 5}

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

  def User.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.valid_password?(password)
    user
  end

  def deny_overlapping_stays stay
    ol_stays = overlapping_pending_stays
    if ol_stays.include? stay
      ol_stays.delete stay
      ol_stays.each do |stay|
        stay.status = 'denied'
        stay.save
      end
    end
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
    if images[0].nil?
      "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
    else
      images.last.thumb_url
    end
  end

  def main_image_thumb_url= url
    image = images.last
    image.thumb_url = url
    image.save
  end

  def name
    if self.role == 'org'
      org_name.capitalize
    else
      first_name.capitalize + ' ' + last_name.capitalize
    end
  end

  # TODO: re-code overlapping stays as a custom validation in the stay model, i.e. when a stay's status is updated to "confirmed", the validation denies all other stays.
  def overlapping_pending_stays stay
    p_stays = pending_stays.reject do |other_stay|
      other_stay.id == stay.id
    end

    if p_stays.length < 1
      return []
    end

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
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def overlapping_stays? stay1, stay2
    if stay1.check_in_date <= stay2.check_out_date or stay1.check_out_date >= stay2.check_in_date
      true
    else
      false
    end
  end
end
