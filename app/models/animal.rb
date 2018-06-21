class Animal < ActiveRecord::Base
  validates_presence_of :name
  validates_presence_of :species
  validates_presence_of :sex
  validates_presence_of :weight
  validates_presence_of :breed
  validates_presence_of :color

  belongs_to(
    :org,
    class_name: 'User',
    foreign_key: :org_id,
    primary_key: :id
  )

  belongs_to(
    :fosterer,
    class_name: 'User',
    foreign_key: :fosterer_id,
    primary_key: :id
  )

  has_many :images, as: :imageable
  has_many :reservations
  has_many :stays, through: :reservations

  def main_image_url
    if images.empty?
      'url_to_default_image'
    else
      images.first.url
    end
  end

  def main_image_thumb_url
    stock_image_url = 'http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png'
    if images.empty? || images.first.thumb_url == stock_image_url
      stock_image_url
    else
      images.first.thumb_url
    end
  end
end
