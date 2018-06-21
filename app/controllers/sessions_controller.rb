require 'net/http'
require_relative '../helpers/application_helper'

class SessionsController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in, except: [:new, :create, :destroy, :sign_in_as_guest]
  skip_before_filter :verify_authenticity_token, only: [:destroy]

  def new
    render layout: 'static_pages'
  end

  def create
    email = params[:user][:email]
    password = params[:user][:password]

    user = User.find_by_credentials(email, password)

    if user
      sign_in(user)
      return redirect_to '/'
    end

    flash.now[:errors] = ['Invalid username or password']
    render 'new', layout: 'static_pages'
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end

  def sign_in_as_guest
    about_info = "Hey everyone! I've always loved animals. But it wasn't until I rescued my Pekingese dog named Hugh, that I realized how much animals bring into our lives! There are currently so many animals out in the world that how so much to give to us and so many people who are willing to add another memeber to the family -- I'm so glad this site exists to help that process along by giving all these animals a place to be while they find their perfect family to go live with!/nI live on the Peninsula but am open to traveling to transport animals to and from my place; do please check in with me about that! If anyone is interested in setting up a get together, let me know!"

    user1 = Fabricate(
      :user,
      password_digest: '$2a$10$X3v2.He5PlB/utS9dJcrXuKdyHOICuud59dOyzBM1oI726.h77f3y',
      about_info: about_info
    )

    user2 = Fabricate :user

    [user1, user2].each do |user|
      user.org_name = 'Guest Rescue Group'
      user.first_name = 'Gus'
      user.last_name = 'Guest'

      Fabricate(
        :image,
        imageable_id: user.id,
        imageable_type: 'User',
        thumb_url: ApplicationHelper.random_profile_image_url
      )

      other_user = (user == user1 ? user2 : user1)

      # Set animals with requests for fostering.
      5.times do
        animal = Fabricate(
          :animal,
          org_id: other_user.id,
          fosterer_id: user.id
        )

        Fabricate(
          :image,
          imageable_id: animal.id,
          imageable_type: 'Animal',
          thumb_url: ApplicationHelper.random_animal_image
        )

        stay = Fabricate(
          :stay,
          status: 'pending',
          org_id: other_user.id,
          fosterer_id: user.id
        )

        Fabricate(
          :reservation,
          animal_id: animal.id,
          stay_id: stay.id
        )
      end

      # Set animals in roster.
      5.times do
        Fabricate(
          :animal,
          org_id: user.id,
          fosterer_id: other_user.id
        )

        random_animal_url = ApplicationHelper.random_animal_image
        Fabricate(
          :image,
          imageable_id: animal.id,
          imageable_type: 'Animal',
          thumb_url: random_animal_url,
          url: random_animal_image
        )
      end
    end

    sign_in(user1)
    redirect_to '/'
  end
end
