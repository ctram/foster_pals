class RemoveStatusColumnFromAnimals < ActiveRecord::Migration
  def change
    remove_column :animals, :status
  end
end
