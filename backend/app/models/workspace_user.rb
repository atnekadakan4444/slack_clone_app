class WorkspaceUser < ApplicationRecord
  belongs_to :user
  belongs_to :workspace

  validates :user_id, uniqueness: { scope: :workspace_id, message: "はすでにこのワークスペースのメンバーです" }
end
