module Api
  # ワークスペースメンバー追加コントローラー
  class WorkspaceUsersController < BaseController
    before_action :set_workspace

    # 複数ユーザーをワークスペースに追加
    def create
      user_ids = Array(params[:user_ids])

      if user_ids.blank?
        render json: { message: "追加するユーザーIDを指定してください" }, status: :bad_request
        return
      end

      existing_user_ids = @workspace.workspace_users.pluck(:user_id)
      new_user_ids = user_ids - existing_user_ids

      # 新規メンバーのみ追加（既存メンバーはスキップ）
      new_user_ids.each do |user_id|
        WorkspaceUser.find_or_create_by(workspace: @workspace, user_id: user_id)
      end

      render json: { status: true, added_count: new_user_ids.size }, status: :ok
    end

    private

    def set_workspace
      @workspace = Workspace.find(params[:workspace_id])
    rescue ActiveRecord::RecordNotFound
      render json: { message: "ワークスペースが見つかりません" }, status: :not_found
    end
  end
end
