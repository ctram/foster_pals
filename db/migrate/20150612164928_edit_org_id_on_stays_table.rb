class EditOrgIdOnStaysTable < ActiveRecord::Migration
  def change
    remove_column :stays, :organzation_id
    add_column :stays, :org_id, :integer
  end
end
