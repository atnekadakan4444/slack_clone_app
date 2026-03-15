class CreateWorkspaces < ActiveRecord::Migration[8.0]
  def change
    create_table :workspaces, id: :uuid do |t|
      t.string :name, null: false
      t.references :admin_user, null: false, foreign_key: { to_table: :users }, type: :uuid

      t.timestamps
    end
  end
end
