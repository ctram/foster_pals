class EditUsers < ActiveRecord::Migration
  def change
    remove_column :users, :types_of_animals_at_location
    remove_column :users, :num_native_animals_at_location
  end
end
