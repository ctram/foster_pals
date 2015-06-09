class CreateStays < ActiveRecord::Migration
  def change
    create_table :stays do |t|
      t.integer :animal_id, null: false
      t.integer :fosterer_id, null: false
      t.integer :organzation_id, null: false
      t.boolean :indefinite_stay
      t.date :check_in_date
      t.date :check_out_date
      t.string :status, null: false

    end
  end
end
