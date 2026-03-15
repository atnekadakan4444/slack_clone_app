require_relative "boot"
require "rails/all"

Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    config.load_defaults 8.0
    config.api_only = true

    # Action Cable の接続を許可
    config.action_cable.disable_request_forgery_protection = true

    # セッションミドルウェアを追加（APIモードでもCookieを扱うため）
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore

    # Cookieからトークンを取り出してAuthorizationヘッダーに変換するカスタムミドルウェア
    config.middleware.use Middleware::CookieToAuthorizationHeader
  end
end
