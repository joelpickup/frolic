class AddAreaToMeetups < ActiveRecord::Migration
  def change
    add_column :meetups, :area, :string
  end
end
