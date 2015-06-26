class ReviseAnimalsStaysRelationship < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.integer :animal_id
      t.integer :stay_id
    end

    remove_column :stays, :animal_id
    remove_column :stays, :indefinite_stay
  end
end
