class AddAddressFieldsToLocation < ActiveRecord::Migration
  def change
    add_column :locations, :address_1, :string
    add_column :locations, :address_2, :string
    add_column :locations, :postcode, :string
  end
end
