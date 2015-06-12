class ReAddStatusColumnToAnimals < ActiveRecord::Migration
  def change
    add_column :animals, :status, :string, null: false
  end
end
