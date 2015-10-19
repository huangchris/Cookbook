class CreateIngredients < ActiveRecord::Migration
  def change
    create_table :ingredients do |t|
      t.integer :recipe_id, null: false
      t.string :data, null: false
      t.integer :ord, null: false
      t.timestamps null: false
    end

    add_foreign_key :ingredients, :recipes
    add_index :ingredients, :recipe_id

  end
end
