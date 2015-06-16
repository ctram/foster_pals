class MakeImagesPolymorphic < ActiveRecord::Migration
  def change
    add_column :images, :imageable_type, :string
    add_column :images, :imageable_id, :integer
    remove_column :images, :owner_id
  end
end
