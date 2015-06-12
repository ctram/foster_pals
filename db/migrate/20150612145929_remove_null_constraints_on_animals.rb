class RemoveNullConstraintsOnAnimals < ActiveRecord::Migration
  def change
    remove_column :animals, :org_id
    remove_column :animals, :fosterer_id
    remove_column :animals, :weight

    add_column :animals, :org_id, :integer
    add_column :animals, :fosterer_id, :integer
    add_column :animals, :weight, :integer, null: false
  end
end
