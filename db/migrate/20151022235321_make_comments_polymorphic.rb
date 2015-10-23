class MakeCommentsPolymorphic < ActiveRecord::Migration
  def change
    remove_index :comments, :recipe_id
    remove_foreign_key :comments, :recipes
    rename_column :comments, :recipe_id, :commentable_id
    add_column :comments, :commentable_type, :string, null: false
  end
end
