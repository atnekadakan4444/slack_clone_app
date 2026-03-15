class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users, id: :uuid do |t|
      # Devise標準カラム
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""
      t.string :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at

      # アプリ固有カラム
      t.string :name, null: false

      # JTI Matcher用（devise-jwt トークン失効管理）
      t.string :jti, null: false

      t.timestamps
    end

    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true
    add_index :users, :jti,                  unique: true
  end
end
