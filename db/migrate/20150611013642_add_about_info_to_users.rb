class AddAboutInfoToUsers < ActiveRecord::Migration
  def change
    add_column :users, :about_info, :text
  end
end
