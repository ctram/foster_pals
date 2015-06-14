class AddImageSetIdToImages < ActiveRecord::Migration
  def change
    add_column :images, :image_set_id, :string
  end
end
