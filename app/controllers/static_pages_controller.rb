class StaticPagesController < ApplicationController
  def front
  end

  def home
  end

  def process_registration
    role = params[:user][:role]
    if role == 'organization'
      redirect_to organizations_url, format: :json
    else
      redirect_to fosterers_url, format: :json
    end
  end

end
