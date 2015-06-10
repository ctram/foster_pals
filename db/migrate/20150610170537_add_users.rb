class AddUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :role, null: false
      t.string :org_name
      t.string :first_name
      t.string :last_name
      t.string :email, null: false
      t.string :street_address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip_code, null: false
      t.integer :num_animals_willing_to_foster, null: false
    end

    add_index :users, :email, unique: true
  end
end
