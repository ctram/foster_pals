class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # Expose these methods to the views
  helper_method :current_user, :signed_in?

  private
  def current_user
    if @current_user
      return @current_user
    end

    user_fosterer = Fosterer.find_by_session_token(session[:session_token])
    user_organization = Organization.find_by_session_token(session[:session_token])

    if user_fosterer.nil?
      @current_user = user_organization
    else
      @current_user = user_fosterer
    end
  end

  def find_by_credentials(email, password)
    user_fosterer = Fosterer.find_by_email(email)
    user_organization = Organization.find_by_email(email)

    byebug
    if !user_fosterer.nil? and
      user_fosterer.valid_password?(password)
      user_fosterer
    elsif !user_organization.nil? and
      user_organization.valid_password?(password)
      user_organization
    else
      nil
    end
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    @current_user = user
    session[:session_token] = user.reset_token!
  end

  def sign_out
    current_user.try(:reset_token!)
    session[:session_token] = nil
    @current_user = nil
    redirect_to new_session_url
  end

  def require_signed_in!
    redirect_to new_session_url unless signed_in?
  end
end
