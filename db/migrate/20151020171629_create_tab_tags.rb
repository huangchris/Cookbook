class CreateTabTags < ActiveRecord::Migration
  def change
    create_table :tab_tags do |t|
      t.string :data, null: false
      t.timestamps null: false
    end

    add_index :tab_tags, :data, unique: true
  end
end
