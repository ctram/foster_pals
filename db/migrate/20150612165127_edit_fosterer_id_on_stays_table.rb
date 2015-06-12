class EditFostererIdOnStaysTable < ActiveRecord::Migration
  def change
    change_column :stays, :fosterer_id, :integer
  end
end
