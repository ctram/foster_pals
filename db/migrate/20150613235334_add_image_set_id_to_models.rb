class AddImageSetIdToModels < ActiveRecord::Migration
  def change
    add_column :users, :image_set_id, :string
    add_column :animals, :image_set_id, :string
  end
end
