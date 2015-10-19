class CreateInstructions < ActiveRecord::Migration
  def change
    create_table :instructions do |t|
      t.integer :recipe_id, null: false
      t.string :data, null: false
      t.integer :ord, null: false
      t.timestamps null: false
    end

    remove_column :recipes, :instructions
    remove_column :recipes, :ingredients
    add_foreign_key :instructions, :recipes
    add_index :instructions, :recipe_id
  end
end
