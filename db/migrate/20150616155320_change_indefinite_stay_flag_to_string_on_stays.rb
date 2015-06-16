class ChangeIndefiniteStayFlagToStringOnStays < ActiveRecord::Migration
  def change
    remove_column :stays, :indefinite_stay
    add_column :stays, :indefinite_stay, :string
  end
end
