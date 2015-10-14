class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.timestamps null: false
    end
    add_foreign_key :user_groups, :groups

  end
end
