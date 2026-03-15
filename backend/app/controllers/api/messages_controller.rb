module Api
  # メッセージCRUDコントローラー
  class MessagesController < BaseController
    before_action :set_workspace
    before_action :set_channel
    before_action :set_message, only: [:destroy]

    # チャンネル内のメッセージ一覧（降順）
    def index
      @messages = @channel.messages
                          .includes(:user)
                          .order(created_at: :desc)
    end

    # テキストメッセージ作成
    def create
      @message = @channel.messages.build(
        content: message_params[:content],
        user:    current_user
      )

      if @message.save
        # Action Cable でリアルタイムブロードキャスト
        broadcast_new_message(@message)
        render :show, status: :created, locals: { message: @message }
      else
        render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # 画像メッセージ作成
    def create_image
      @message = @channel.messages.build(user: current_user)
      @message.image.attach(params[:image]) if params[:image].present?

      if @message.save
        broadcast_new_message(@message)
        render :show, status: :created, locals: { message: @message }
      else
        render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # メッセージ削除（所有者のみ）
    def destroy
      unless @message.user_id == current_user.id
        render json: { message: "自分のメッセージのみ削除できます" }, status: :forbidden
        return
      end

      @message.destroy
      # Action Cable で削除イベントをブロードキャスト
      MessagesChannel.broadcast_to(
        @channel,
        { type: "delete-message", id: @message.id }
      )
      render json: { status: true }, status: :ok
    end

    private

    def set_workspace
      @workspace = Workspace.find(params[:workspace_id])
    rescue ActiveRecord::RecordNotFound
      render json: { message: "ワークスペースが見つかりません" }, status: :not_found
    end

    def set_channel
      @channel = @workspace.channels.find(params[:channel_id])
    rescue ActiveRecord::RecordNotFound
      render json: { message: "チャンネルが見つかりません" }, status: :not_found
    end

    def set_message
      @message = @channel.messages.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { message: "メッセージが見つかりません" }, status: :not_found
    end

    def message_params
      params.require(:message).permit(:content)
    end

    def broadcast_new_message(message)
      MessagesChannel.broadcast_to(
        message.channel,
        {
          type:          "new-message",
          id:            message.id,
          content:       message.content,
          image_url:     message.image_url,
          created_at:    message.created_at,
          user: {
            id:            message.user.id,
            name:          message.user.name,
            thumbnail_url: message.user.thumbnail_url
          }
        }
      )
    end
  end
end
