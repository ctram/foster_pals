class EditMessages < ActiveRecord::Migration
  def change
    change_column :messages, :author_id, :integer, {null: false}
    change_column :messages, :recipient_id, :integer, {null: false}
    change_column :messages, :title, :string, {null: false}
    change_column :messages, :content, :string, {null: false}
  end
end
