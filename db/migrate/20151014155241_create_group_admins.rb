class CreateGroupAdmins < ActiveRecord::Migration
  def change
    create_table :group_admins do |t|
      t.integer :user_id, null: false
      t.integer :group_id, null: false
      t.timestamps null: false
    end
    add_index :group_admins, :user_id
    add_index :group_admins, :group_id
    add_foreign_key :group_admins, :users
    add_foreign_key :group_admins, :groups
  end
end
