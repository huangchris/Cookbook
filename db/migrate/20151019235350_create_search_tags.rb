class CreateSearchTags < ActiveRecord::Migration
  def change
    create_table :search_tags do |t|
      t.string :data, null: false
      t.timestamps null: false
    end

    add_index :search_tags, :data, unique: true
  end
end
