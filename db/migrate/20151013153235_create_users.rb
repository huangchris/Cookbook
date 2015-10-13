class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token
      t.string :name, null: false
      t.string :image
      t.timestamps null: false
    end

    add_index :users, :email, unique: true
    add_index :users, :session_token
  end
end
