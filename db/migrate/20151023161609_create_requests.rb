class CreateRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.string :title, null: false
      t.string :description
      t.integer :group_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :requests, :group_id
    add_index :requests, :user_id
    add_foreign_key :requests, :groups
    add_foreign_key :requests, :users
  end
end
