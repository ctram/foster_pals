class DropMessages < ActiveRecord::Migration
  def change
    drop_table :messages

    create_table :messages do |t|
      t.integer  "sender_id",        null: false
      t.integer  "recipient_id",     null: false
      t.string   "title",            null: false
      t.string   "content",          null: false

      t.timestamps
    end

    create_table :posts do |t|
      t.integer  "poster_id",        null: false
      t.string   "title",            null: false
      t.string   "content",          null: false

      t.timestamps
    end

    create_table :comments do |t|
      t.integer  "commenter_id",        null: false
      t.string   "title",            null: false
      t.string   "content",          null: false

      t.timestamps
    end
  end
end
