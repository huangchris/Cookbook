class DropTabTagJoin < ActiveRecord::Migration
  def change
    drop_table :recipe_tab_tags
    add_column :recipes, :tab_tag_id, :integer, null: false
    add_index :recipes, :tab_tag_id
    add_foreign_key :recipes, :tab_tags
  end
end
