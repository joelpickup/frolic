class AddTownToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :town, :string
  end
end
