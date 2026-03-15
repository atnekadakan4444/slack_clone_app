class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  # ログイン成功時: JWTをHttpOnlyCookieにセットして返す
  def respond_with(resource, _opts = {})
    if resource.persisted?
      token = request.env["warden-jwt_auth.token"]
      set_auth_cookie(token) if token.present?

      render json: {
        id:            resource.id,
        name:          resource.name,
        email:         resource.email,
        thumbnail_url: resource.thumbnail_url
      }, status: :ok
    else
      render json: { message: "メールアドレスまたはパスワードが正しくありません" }, status: :unauthorized
    end
  end

  # ログアウト時: Cookieを削除する
  def respond_to_on_destroy
    delete_auth_cookie
    render json: { message: "ログアウトしました" }, status: :ok
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

  def delete_auth_cookie
    cookies.delete(:auth_token, path: "/")
  end
end
