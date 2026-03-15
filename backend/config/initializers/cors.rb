Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # フロントエンドのオリジンを許可
    origins ENV.fetch("ALLOWED_ORIGIN", "http://localhost:3000")

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      # Cookieを含むリクエストを許可するために必須
      credentials: true
  end
end
