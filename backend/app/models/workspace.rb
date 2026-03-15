class Workspace < ApplicationRecord
  belongs_to :admin_user, class_name: "User", foreign_key: :admin_user_id
  has_many :channels, dependent: :destroy
  has_many :workspace_users, dependent: :destroy
  has_many :members, through: :workspace_users, source: :user

  validates :name, presence: true

  # ワークスペース作成時にgeneralチャンネルを自動作成
  after_create :create_general_channel

  private

  def create_general_channel
    channels.create!(name: "general")
  end
end
