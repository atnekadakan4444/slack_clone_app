class CreateWorkspaceUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :workspace_users, id: :uuid do |t|
      t.references :user,      null: false, foreign_key: true, type: :uuid
      t.references :workspace, null: false, foreign_key: true, type: :uuid

      t.datetime :created_at, null: false, default: -> { "CURRENT_TIMESTAMP" }
    end

    add_index :workspace_users, [:user_id, :workspace_id], unique: true
  end
end
