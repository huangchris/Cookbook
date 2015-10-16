class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.integer :user_id, null: false
      t.integer :group_id, null: false
      t.boolean :personal, null: false
      t.string :title, null: false
      t.string :photo
      t.text :description
      t.text :ingredients, null: false
      t.text :instructions, null: false
      t.timestamps null: false
    end

    add_index :recipes, :user_id
    add_index :recipes, :group_id
    add_index :recipes, :title
    add_foreign_key :recipes, :users
    add_foreign_key :recipes, :groups
  end
end
