class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :redirect_to_front_if_not_signed_in, except: [:front]

  # Expose these methods to the views
  helper_method :current_user, :signed_in?

  private
  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
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
  end

  def require_signed_in!
    redirect_to new_session_url unless signed_in?
  end

  def redirect_to_front_if_not_signed_in
    redirect_to front_url unless signed_in?
  end
end

# TODO: working sign out button in the backbone navbar -- todo: hook up a button to a form that issues a delete to the sessions controller , then redirect to the sign in page.
