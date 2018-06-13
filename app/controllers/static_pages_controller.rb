class StaticPagesController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in, except: [:front]

  def front
  end

  def app
    @context = 'app'
  end

end
