class Channel < ApplicationRecord
  belongs_to :workspace
  has_many :messages, dependent: :destroy

  validates :name, presence: true
  validates :workspace, presence: true
end
