class CreateRecipeTabTags < ActiveRecord::Migration
  def change
    create_table :recipe_tab_tags do |t|
      t.integer :recipe_id, null: false
      t.integer :tab_tag_id, null: false
      t.timestamps null: false
    end

    add_index :recipe_tab_tags, :tab_tag_id
    add_index :recipe_tab_tags, :recipe_id
    add_index :recipe_tab_tags, [:recipe_id, :tab_tag_id], unique: true
    add_foreign_key :recipe_tab_tags, :tab_tags
    add_foreign_key :recipe_tab_tags, :recipes
  end
end
