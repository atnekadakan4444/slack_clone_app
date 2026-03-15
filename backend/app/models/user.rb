class User < ApplicationRecord
  # Devise モジュール（confirmableは除外してシンプルに）
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: self

  # JTI Matcher によるトークン失効戦略の実装
  include Devise::JWT::RevocationStrategies::JTIMatcher

  has_many :workspaces, foreign_key: :admin_user_id, dependent: :destroy
  has_many :workspace_users, dependent: :destroy
  has_many :joined_workspaces, through: :workspace_users, source: :workspace
  has_many :messages, dependent: :destroy

  # Active Storage（プロフィール画像）
  has_one_attached :avatar

  validates :name, presence: true

  # プロフィール画像のURLを返すヘルパー
  def thumbnail_url
    return nil unless avatar.attached?
    Rails.application.routes.url_helpers.rails_blob_url(avatar, host: ENV.fetch("APP_HOST", "http://localhost:3001"))
  end
end
