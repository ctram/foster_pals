class RenameZipCodeForUsers < ActiveRecord::Migration[5.0]
  def change
    rename_column :users, :zip_code, :zipcode
  end
end
