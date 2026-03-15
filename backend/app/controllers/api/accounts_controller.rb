module Api
  # アカウント（プロフィール）更新コントローラー
  class AccountsController < BaseController
    def update
      # プロフィール画像が添付されていれば更新
      if params[:avatar].present?
        current_user.avatar.attach(params[:avatar])
      end

      # 名前が指定されていれば更新
      if params[:name].present?
        unless current_user.update(name: params[:name])
          render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
          return
        end
      end

      render :show, locals: { user: current_user }
    end
  end
end
