# メッセージのリアルタイム配信チャンネル
class MessagesChannel < ApplicationCable::Channel
  def subscribed
    channel_id = params[:channel_id]
    channel = Channel.find_by(id: channel_id)

    if channel
      stream_for channel
    else
      reject
    end
  end

  def unsubscribed
    stop_all_streams
  end
end
