module Api
  # ワークスペースCRUDコントローラー
  class WorkspacesController < BaseController
    before_action :set_workspace, only: [:show, :update, :destroy]
    before_action :authorize_admin!, only: [:update, :destroy]

    # 自分が所属するワークスペース一覧
    def index
      @workspaces = current_user.joined_workspaces
                                .includes(:admin_user)
                                .order(created_at: :desc)
    end

    # ワークスペース詳細
    def show
      # ネストしたリソース用に @workspace は before_action でセット済み
    end

    # ワークスペース作成（generalチャンネル自動作成・作成者をメンバーに追加）
    def create
      @workspace = current_user.workspaces.build(
        name:          workspace_params[:name],
        admin_user_id: current_user.id
      )

      if @workspace.save
        # 作成者をワークスペースメンバーとして追加
        @workspace.workspace_users.create!(user: current_user)
        render :show, status: :created, locals: { workspace: @workspace }
      else
        render json: { errors: @workspace.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # ワークスペース名更新（管理者のみ）
    def update
      if @workspace.update(workspace_params)
        render :show, locals: { workspace: @workspace }
      else
        render json: { errors: @workspace.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # ワークスペース削除（管理者のみ）
    def destroy
      @workspace.destroy
      render json: { status: true }, status: :ok
    end

    private

    def set_workspace
      @workspace = Workspace.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { message: "ワークスペースが見つかりません" }, status: :not_found
    end

    def authorize_admin!
      unless @workspace.admin_user_id == current_user.id
        render json: { message: "管理者権限が必要です" }, status: :forbidden
      end
    end

    def workspace_params
      params.require(:workspace).permit(:name)
    end
  end
end
