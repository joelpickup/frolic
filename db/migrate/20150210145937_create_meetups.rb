class CreateMeetups < ActiveRecord::Migration
  def change
    create_table :meetups do |t|
      t.string :name
      t.text :description
      t.integer :location_id
      t.integer :image_id
      t.time :time

      t.timestamps
    end
  end
end
