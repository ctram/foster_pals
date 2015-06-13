class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.integer :owner_id
      t.string :url
      t.string :thumb_url

      t.timestamps null: false
    end
  end
end
