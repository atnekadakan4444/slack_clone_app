class Message < ApplicationRecord
  belongs_to :user
  belongs_to :channel

  # Active Storage（メッセージ画像）
  has_one_attached :image

  validates :channel, presence: true
  validates :user, presence: true
  # content または image のどちらかが必須
  validate :content_or_image_present

  # メッセージ画像のURLを返すヘルパー
  def image_url
    return nil unless image.attached?
    Rails.application.routes.url_helpers.rails_blob_url(image, host: ENV.fetch("APP_HOST", "http://localhost:3001"))
  end

  private

  def content_or_image_present
    if content.blank? && !image.attached?
      errors.add(:base, "テキストまたは画像のいずれかが必要です")
    end
  end
end
