class CreateRecipeSearchTags < ActiveRecord::Migration
  def change
    create_table :recipe_search_tags do |t|
      t.integer :search_tag_id, null: false
      t.integer :recipe_id, null:false
      t.timestamps null: false
    end

    add_index :recipe_search_tags, :search_tag_id
    add_index :recipe_search_tags, :recipe_id
    add_index :recipe_search_tags, [:recipe_id, :search_tag_id], unique: true
    add_foreign_key :recipe_search_tags, :search_tags
    add_foreign_key :recipe_search_tags, :recipes
  end
end
