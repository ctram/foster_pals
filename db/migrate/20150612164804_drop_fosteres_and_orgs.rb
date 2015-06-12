class DropFosteresAndOrgs < ActiveRecord::Migration
  def change
    drop_table :fosterers
    drop_table :organizations
  end
end
