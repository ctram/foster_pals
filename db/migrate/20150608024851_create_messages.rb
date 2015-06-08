class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :messageable_type, null: false
      t.integer :author_id
      t.integer :recipient_id
      t.string :title
      t.text :content

      t.timestamps null: false
    end
  end
end
