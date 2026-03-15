module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      # WebSocket接続時にCookieからJWTを検証
      token = cookies[:auth_token]
      if token.present?
        # devise-jwt を使ってトークンを検証
        decoded = JWT.decode(
          token,
          ENV.fetch("DEVISE_JWT_SECRET_KEY"),
          true,
          { algorithm: "HS256" }
        )
        user_id = decoded.first["sub"]
        User.find(user_id)
      else
        reject_unauthorized_connection
      end
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      reject_unauthorized_connection
    end
  end
end
