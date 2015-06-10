class CreateAnimals < ActiveRecord::Migration
  def change
    create_table :animals do |t|
      t.string :org_id, null: false
      t.string :fosterer_id, null: false
      t.string :name, null: false
      t.string :species, null: false
      t.string :sex, null: false
      t.string :weight, null: false
      t.string :breed, null: false
      t.string :color, null: false
    end
  end
end
