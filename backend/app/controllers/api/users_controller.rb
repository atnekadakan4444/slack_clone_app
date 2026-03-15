module Api
  # ユーザー検索コントローラー
  class UsersController < BaseController
    def index
      keyword = params[:keyword].to_s.strip

      if keyword.blank?
        render json: [], status: :ok
        return
      end

      # 名前またはメールで部分一致検索（自分自身を除外）
      @users = User.where.not(id: current_user.id)
                   .where(
                     "name ILIKE :q OR email ILIKE :q",
                     q: "%#{User.sanitize_sql_like(keyword)}%"
                   )

      render :index, locals: { users: @users }
    end
  end
end
