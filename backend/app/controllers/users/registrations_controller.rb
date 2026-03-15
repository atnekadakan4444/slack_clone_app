class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  before_action :configure_sign_up_params, only: [:create]

  private

  # サインアップ成功時: JWTをHttpOnlyCookieにセットして返す
  def respond_with(resource, _opts = {})
    if resource.persisted?
      token = request.env["warden-jwt_auth.token"]
      set_auth_cookie(token) if token.present?

      render json: {
        id:            resource.id,
        name:          resource.name,
        email:         resource.email,
        thumbnail_url: resource.thumbnail_url
      }, status: :created
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  def set_auth_cookie(token)
    cookies[:auth_token] = {
      value:     token,
      httponly:  true,
      secure:    Rails.env.production?,
      same_site: :lax,
      expires:   1.day.from_now
    }
  end
end
