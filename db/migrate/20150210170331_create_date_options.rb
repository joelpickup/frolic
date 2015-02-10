class CreateDateOptions < ActiveRecord::Migration
  def change
    create_table :date_options do |t|
      t.integer :meetup_id
      t.date :date
      t.boolean :chosen

      t.timestamps
    end
  end
end
