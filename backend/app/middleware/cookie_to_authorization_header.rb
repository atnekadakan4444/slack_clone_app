module Middleware
  # CookieのJWTトークンをAuthorizationヘッダーに変換するミドルウェア
  # APIモードでHttpOnlyCookieを使った認証を実現するために必要
  class CookieToAuthorizationHeader
    AUTH_COOKIE_NAME = "auth_token"

    def initialize(app)
      @app = app
    end

    def call(env)
      # すでにAuthorizationヘッダーが存在する場合はスキップ
      unless env["HTTP_AUTHORIZATION"].present?
        # Cookie文字列をパース
        cookies = parse_cookies(env["HTTP_COOKIE"])
        token = cookies[AUTH_COOKIE_NAME]

        if token.present?
          # devise-jwtが認識できるBearerトークン形式に変換
          env["HTTP_AUTHORIZATION"] = "Bearer #{token}"
        end
      end

      @app.call(env)
    end

    private

    def parse_cookies(cookie_string)
      return {} if cookie_string.blank?

      cookie_string.split(";").each_with_object({}) do |cookie, hash|
        key, value = cookie.strip.split("=", 2)
        hash[key.strip] = CGI.unescape(value.to_s.strip)
      end
    end
  end
end
