class RemoveNumAnimalsAttr < ActiveRecord::Migration
  def change
    remove_column :users, :num_animals_willing_to_foster
  end
end
