class MakeStaysCheckOutDateNullable < ActiveRecord::Migration[5.0]
  def change
    change_column_null :stays, :check_out_date, true
  end
end
