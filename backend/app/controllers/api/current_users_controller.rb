module Api
  # 現在のログインユーザー情報を返すコントローラー
  class CurrentUsersController < BaseController
    def show
      render :show, locals: { user: current_user }
    end
  end
end
