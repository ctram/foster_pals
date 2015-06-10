class RemoveNameFromOrgs < ActiveRecord::Migration
  def change
    remove_column :organizations, :name
  end
end
