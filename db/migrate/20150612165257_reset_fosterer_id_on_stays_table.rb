class ResetFostererIdOnStaysTable < ActiveRecord::Migration
  def change
    remove_column :stays, :fosterer_id
    add_column :stays, :fosterer_id, :integer
  end
end
