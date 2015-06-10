class AddTimestamps < ActiveRecord::Migration
  def change
    add_column :animals, :created_at, :datetime
    add_column :animals, :updated_at, :datetime
    add_column :fosterers, :created_at, :datetime
    add_column :fosterers, :updated_at, :datetime
    add_column :organizations, :created_at, :datetime
    add_column :organizations, :updated_at, :datetime
    add_column :stays, :created_at, :datetime
    add_column :stays, :updated_at, :datetime
  end
end
