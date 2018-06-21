class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # Expose these methods to the views
  helper_method :current_user, :signed_in?

  private

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def redirect_to_front_if_not_signed_in
    redirect_to front_url unless signed_in?
  end

  def require_signed_in!
    redirect_to new_session_url unless signed_in?
  end

  def signed_in?
    current_user ? true : false
  end

  def sign_in(user)
    @current_user = user
    session[:session_token] = user.reset_token!
  end

  def sign_out
    current_user.try(:reset_token!)
    session[:session_token] = nil
  end
end
