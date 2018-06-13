require 'net/http'

class SessionsController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in, except: [:new, :create, :destroy, :sign_in_as_guest]
  skip_before_filter :verify_authenticity_token, :only => [:destroy]

  def new
    render layout: 'static_pages'
  end

  def create
    email = params[:user][:email]
    password = params[:user][:password]

    user = User.find_by_credentials(email, password)

    if user
      sign_in(user)
      user_id = user.id
      user_role = user.class.to_s.downcase + 's'
      redirect_to "/"
    else
      flash.now[:errors] = ["Invalid username or password"]
      render 'new'
    end
  end

  def destroy
    sign_out
    render json: {}
  end

  def sign_in_as_guest
    coords1 = generate_random_sf_coords
    coords2 = generate_random_sf_coords

    about_info = "Hey everyone! I've always loved animals. But it wasn't until I rescued my Pekingese dog named Hugh, that I realized how much animals bring into our lives! There are currently so many animals out in the world that how so much to give to us and so many people who are willing to add another memeber to the family -- I'm so glad this site exists to help that process along by giving all these animals a place to be while they find their perfect family to go live with!/nI live on the Peninsula but am open to traveling to transport animals to and from my place; do please check in with me about that! If anyone is interested in setting up a get together, let me know!"

    user1 = Fabricate(
      :user,
      password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
      lat: coords1[0],
      long: coords1[1],
      about_info: about_info
    )

    hsh_address = generate_postal_address user1.lat, user1.long
    set_postal_address user1, hsh_address

    user2 = Fabricate(
      :user,
      lat: coords2[0],
      long: coords2[1]
    )

    hsh_address = generate_postal_address user2.lat, user2.long
    set_postal_address user2, hsh_address

    [user1, user2].each do |user|
      user.org_name = "Guest Rescue Group"
      user.first_name = 'Gus'
      user.last_name = 'Guest'

      image_url = random_profile_image_url

      image = Fabricate(
        :image,
        imageable_id: user.id,
        imageable_type: 'User',
        thumb_url: image_url
      )

      other_user = (user == user1 ? user2 : user1)

      # Set animals with requests for fostering.
      5.times do
        animal = Fabricate(
          :animal,
          org_id: other_user.id,
          fosterer_id: user.id,
        )

        image = Fabricate(
          :image,
          imageable_id: animal.id,
          imageable_type: 'Animal'
        )
        image.thumb_url = random_animal_image
        image.save

        stay = Fabricate(
          :stay,
          status: 'pending',
          org_id: other_user.id,
          fosterer_id: user.id,
        )

        Fabricate(
          :reservation,
          animal_id: animal.id,
          stay_id: stay.id
        )
      end

      # Set animals in roster.
      5.times do
        animal = Fabricate(
          :animal,
          org_id: user.id,
          fosterer_id: other_user.id,
        )

        image = Fabricate(
          :image,
          imageable_id: animal.id,
          imageable_type: 'Animal'
        )
        image.thumb_url = random_animal_image
        image.url = image.thumb_url
        image.save
      end
    end

    sign_in(user1)
    redirect_to "/"
  end

end
