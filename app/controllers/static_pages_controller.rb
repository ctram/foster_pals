class StaticPagesController < ApplicationController
  before_action :redirect_to_front_if_not_signed_in, except: [:front]

  def front
    render layout: 'static_pages'
  end

  def app
    render layout: 'application'
  end
end
