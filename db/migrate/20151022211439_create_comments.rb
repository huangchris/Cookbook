class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false
      t.integer :recipe_id, null: false
      t.string :body, null: false
      t.timestamps null: false
    end

    add_index :comments, :user_id
    add_index :comments, :recipe_id
    add_foreign_key :comments, :users
    add_foreign_key :comments, :recipes
  end
end
