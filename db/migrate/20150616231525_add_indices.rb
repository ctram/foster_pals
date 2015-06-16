class AddIndices < ActiveRecord::Migration
  def change
    add_index :animals, :id
    add_index :animals, :fosterer_id
    add_index :animals, :org_id
    add_index :comments, :id
    add_index :comments, :commenter_id
    add_index :images, :id
    add_index :images, :imageable_id
    add_index :messages, :id
    add_index :messages, :sender_id
    add_index :messages, :recipient_id
    add_index :posts, :id
    add_index :posts, :poster_id
    add_index :stays, :id
    add_index :stays, :animal_id
    add_index :stays, :check_in_date
    add_index :stays, :check_out_date
    add_index :stays, :org_id
    add_index :stays, :fosterer_id
    add_index :users, :id
  end
end
