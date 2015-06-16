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

ActiveRecord::Schema.define(version: 20150616231525) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "animals", force: :cascade do |t|
    t.string   "name",         null: false
    t.string   "species",      null: false
    t.string   "sex",          null: false
    t.string   "breed",        null: false
    t.string   "color",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "org_id"
    t.integer  "fosterer_id"
    t.integer  "weight",       null: false
    t.string   "status",       null: false
    t.string   "image_set_id"
  end

  add_index "animals", ["fosterer_id"], name: "index_animals_on_fosterer_id", using: :btree
  add_index "animals", ["id"], name: "index_animals_on_id", using: :btree
  add_index "animals", ["org_id"], name: "index_animals_on_org_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.integer  "commenter_id", null: false
    t.string   "title",        null: false
    t.string   "content",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["commenter_id"], name: "index_comments_on_commenter_id", using: :btree
  add_index "comments", ["id"], name: "index_comments_on_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.string   "url"
    t.string   "thumb_url"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "image_set_id"
    t.string   "imageable_type"
    t.integer  "imageable_id"
  end

  add_index "images", ["id"], name: "index_images_on_id", using: :btree
  add_index "images", ["imageable_id"], name: "index_images_on_imageable_id", using: :btree

  create_table "messages", force: :cascade do |t|
    t.integer  "sender_id",    null: false
    t.integer  "recipient_id", null: false
    t.string   "title",        null: false
    t.string   "content",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "messages", ["id"], name: "index_messages_on_id", using: :btree
  add_index "messages", ["recipient_id"], name: "index_messages_on_recipient_id", using: :btree
  add_index "messages", ["sender_id"], name: "index_messages_on_sender_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.integer  "poster_id",  null: false
    t.string   "title",      null: false
    t.string   "content",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "posts", ["id"], name: "index_posts_on_id", using: :btree
  add_index "posts", ["poster_id"], name: "index_posts_on_poster_id", using: :btree

  create_table "stays", force: :cascade do |t|
    t.integer  "animal_id",       null: false
    t.date     "check_in_date"
    t.date     "check_out_date"
    t.string   "status",          null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "org_id"
    t.integer  "fosterer_id"
    t.string   "indefinite_stay"
  end

  add_index "stays", ["animal_id"], name: "index_stays_on_animal_id", using: :btree
  add_index "stays", ["check_in_date"], name: "index_stays_on_check_in_date", using: :btree
  add_index "stays", ["check_out_date"], name: "index_stays_on_check_out_date", using: :btree
  add_index "stays", ["fosterer_id"], name: "index_stays_on_fosterer_id", using: :btree
  add_index "stays", ["id"], name: "index_stays_on_id", using: :btree
  add_index "stays", ["org_id"], name: "index_stays_on_org_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string  "password_digest",               null: false
    t.string  "session_token",                 null: false
    t.string  "role",                          null: false
    t.string  "org_name"
    t.string  "first_name"
    t.string  "last_name"
    t.string  "email",                         null: false
    t.string  "street_address",                null: false
    t.string  "city",                          null: false
    t.string  "state",                         null: false
    t.string  "zip_code",                      null: false
    t.integer "num_animals_willing_to_foster", null: false
    t.text    "about_info"
    t.string  "image_set_id"
    t.float   "lat"
    t.float   "long"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["id"], name: "index_users_on_id", using: :btree

end
