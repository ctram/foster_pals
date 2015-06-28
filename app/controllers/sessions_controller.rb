require 'net/http'

class SessionsController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in, except: [:new, :create, :destroy, :sign_in_as_guest]
  skip_before_filter :verify_authenticity_token, :only => [:destroy]

  def new
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
      render :new
    end
  end

  def destroy
    sign_out
    render json: {}
  end

  def sign_in_as_guest
    user1 = Fabricate(
      :user,
      password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y'
    )

    user2 = Fabricate(
      :user
    )

    [user1, user2].each do |user|
      user.org_name = "Guest Rescue Group"
      user.first_name = ' Gus'
      user.last_name = ' Guest'
      user = generate_lat_and_long_for_user user

      uri = URI("http://uifaces.com/api/v1/random")

      begin
        random_user = JSON.parse(Net::HTTP.get(uri))
        image_url = random_user['image_urls']['epic']
      rescue
        image_url = "http://png-3.findicons.com/files/icons/367/ifunny/128/dog.png"
      end

      image = Fabricate(
        :image,
        imageable_id: user.id,
        imageable_type: 'User',
        thumb_url: image_url
      )

      other_user = (user == user1 ? user2 : user1)

      # Set ten animals for user's roster / these animals will in the other user's schedule manager.
      5.times do
        animal = Fabricate(
          :animal,
          org_id: user.id,
          fosterer_id: other_user.id,
        )

        Fabricate(
          :image,
          imageable_id: animal.id,
          imageable_type: 'Animal'
        )

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
    end

    sign_in(user1)
    redirect_to "/"
  end
end
