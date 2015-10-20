# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151020171637) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "groups", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ingredients", force: :cascade do |t|
    t.integer  "recipe_id",  null: false
    t.string   "data",       null: false
    t.integer  "ord",        null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "ingredients", ["recipe_id"], name: "index_ingredients_on_recipe_id", using: :btree

  create_table "instructions", force: :cascade do |t|
    t.string   "data",       null: false
    t.integer  "ord",        null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "recipe_id",  null: false
  end

  add_index "instructions", ["recipe_id"], name: "index_instructions_on_recipe_id", using: :btree

  create_table "recipe_search_tags", force: :cascade do |t|
    t.integer  "search_tag_id", null: false
    t.integer  "recipe_id",     null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "recipe_search_tags", ["recipe_id", "search_tag_id"], name: "index_recipe_search_tags_on_recipe_id_and_search_tag_id", unique: true, using: :btree
  add_index "recipe_search_tags", ["recipe_id"], name: "index_recipe_search_tags_on_recipe_id", using: :btree
  add_index "recipe_search_tags", ["search_tag_id"], name: "index_recipe_search_tags_on_search_tag_id", using: :btree

  create_table "recipe_tab_tags", force: :cascade do |t|
    t.integer  "recipe_id",  null: false
    t.integer  "tab_tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "recipe_tab_tags", ["recipe_id", "tab_tag_id"], name: "index_recipe_tab_tags_on_recipe_id_and_tab_tag_id", unique: true, using: :btree
  add_index "recipe_tab_tags", ["recipe_id"], name: "index_recipe_tab_tags_on_recipe_id", using: :btree
  add_index "recipe_tab_tags", ["tab_tag_id"], name: "index_recipe_tab_tags_on_tab_tag_id", using: :btree

  create_table "recipes", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.integer  "group_id",    null: false
    t.boolean  "personal",    null: false
    t.string   "title",       null: false
    t.string   "photo"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "recipes", ["group_id"], name: "index_recipes_on_group_id", using: :btree
  add_index "recipes", ["title"], name: "index_recipes_on_title", using: :btree
  add_index "recipes", ["user_id"], name: "index_recipes_on_user_id", using: :btree

  create_table "search_tags", force: :cascade do |t|
    t.string   "data",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "search_tags", ["data"], name: "index_search_tags_on_data", unique: true, using: :btree

  create_table "tab_tags", force: :cascade do |t|
    t.string   "data",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "tab_tags", ["data"], name: "index_tab_tags_on_data", unique: true, using: :btree

  create_table "user_groups", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "group_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "status"
  end

  add_index "user_groups", ["group_id"], name: "index_user_groups_on_group_id", using: :btree
  add_index "user_groups", ["user_id", "group_id"], name: "index_user_groups_on_user_id_and_group_id", unique: true, using: :btree
  add_index "user_groups", ["user_id"], name: "index_user_groups_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token"
    t.string   "name",            null: false
    t.string   "image"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

  add_foreign_key "ingredients", "recipes"
  add_foreign_key "instructions", "recipes"
  add_foreign_key "recipe_search_tags", "recipes"
  add_foreign_key "recipe_search_tags", "search_tags"
  add_foreign_key "recipe_tab_tags", "recipes"
  add_foreign_key "recipe_tab_tags", "tab_tags"
  add_foreign_key "recipes", "groups"
  add_foreign_key "recipes", "users"
  add_foreign_key "user_groups", "groups"
  add_foreign_key "user_groups", "users"
end
