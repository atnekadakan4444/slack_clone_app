module Api
  # チャンネルCRUDコントローラー
  class ChannelsController < BaseController
    before_action :set_workspace
    before_action :set_channel, only: [:show, :destroy]

    # ワークスペース内のチャンネル一覧
    def index
      @channels = @workspace.channels.order(created_at: :asc)
    end

    # チャンネル詳細
    def show
    end

    # チャンネル作成
    def create
      @channel = @workspace.channels.build(channel_params)

      if @channel.save
        render :show, status: :created, locals: { channel: @channel }
      else
        render json: { errors: @channel.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # チャンネル削除（最後の1つは削除不可）
    def destroy
      # ワークスペース内に残るチャンネル数を確認
      if @workspace.channels.count <= 1
        render json: { message: "最後のチャンネルは削除できません" }, status: :forbidden
        return
      end

      @channel.destroy
      render json: { status: true }, status: :ok
    end

    private

    def set_workspace
      @workspace = Workspace.find(params[:workspace_id])
    rescue ActiveRecord::RecordNotFound
      render json: { message: "ワークスペースが見つかりません" }, status: :not_found
    end

    def set_channel
      @channel = @workspace.channels.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { message: "チャンネルが見つかりません" }, status: :not_found
    end

    def channel_params
      params.require(:channel).permit(:name)
    end
  end
end
