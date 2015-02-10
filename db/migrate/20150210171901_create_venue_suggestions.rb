class CreateVenueSuggestions < ActiveRecord::Migration
  def change
    create_table :venue_suggestions do |t|
      t.float :lat
      t.float :long
      t.string :venue_name
      t.integer :venue_id
      t.string :event_name
      t.integer :event_id
      t.integer :meetup_id
      t.text :event_description
      t.integer :user_id

      t.timestamps
    end
  end
end
