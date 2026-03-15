class CreateChannels < ActiveRecord::Migration[8.0]
  def change
    create_table :channels, id: :uuid do |t|
      t.string :name, null: false
      t.references :workspace, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
