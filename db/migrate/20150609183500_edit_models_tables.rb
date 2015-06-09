class EditModelsTables < ActiveRecord::Migration
  def change
    drop_table :users

    create_table :fosterers do |t|
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.integer :num_animals_willing_to_foster, null: false
      t.string :street_address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip_code, null: false
    end

    create_table :organizations do |t|
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :name, null: false
      t.string :leader_first_name, null: false
      t.string :leader_last_name, null: false
      t.string :email, null: false
      t.string :street_address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip_code, null: false
    end
  end

end
