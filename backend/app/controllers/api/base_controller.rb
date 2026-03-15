module Api
  # 認証が必要なAPIの基底コントローラー
  class BaseController < ApplicationController
    before_action :authenticate_user!

    private

    # 未認証時のレスポンス
    def authenticate_user!
      super
    rescue StandardError
      render json: { message: "認証が必要です" }, status: :unauthorized
    end
  end
end
