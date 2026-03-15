Devise.setup do |config|
  config.mailer_sender = "please-change-me-at-config-initializers-devise@example.com"
  require "devise/orm/active_record"
  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]
  config.skip_session_storage = [:http_auth]
  config.stretches = Rails.env.test? ? 1 : 12
  config.reconfirmable = false
  config.expire_all_remember_me_on_sign_out = true
  config.password_length = 6..128
  config.email_regexp = /\A[^@\s]+@[^@\s]+\z/
  config.reset_password_within = 6.hours
  config.sign_out_via = :delete
  config.responder.error_status = :unprocessable_entity
  config.responder.redirect_status = :found

  # devise-jwt 設定
  config.jwt do |jwt|
    jwt.secret = ENV.fetch("DEVISE_JWT_SECRET_KEY", Rails.application.credentials.devise_jwt_secret_key!)
    jwt.dispatch_requests = [
      ["POST", %r{^/auth/signin$}],
      ["POST", %r{^/auth/signup$}]
    ]
    jwt.revocation_requests = [
      ["DELETE", %r{^/auth/signout$}]
    ]
    # トークン有効期限: 1日
    jwt.expiration_time = 1.day.to_i
  end
end
