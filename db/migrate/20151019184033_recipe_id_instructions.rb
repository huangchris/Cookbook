class RecipeIdInstructions < ActiveRecord::Migration
  def change
    # add_column :instructions, :recipe_id, :integer, null: false
    # add_foreign_key :instructions, :recipes
    # add_index :instructions, :recipe_id
  end
end

# yeah, I edited this later; for some reason this column didn't generate in
# development, but now it's a problem on production.
