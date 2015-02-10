class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.text :description
      t.float :lat
      t.float :long
      t.integer :venue_id

      t.timestamps
    end
  end
end
