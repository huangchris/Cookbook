class PendingMemberAdmin < ActiveRecord::Migration
  def change
    drop_table :group_admins

    add_column :user_groups, :status, :string
  end
end
