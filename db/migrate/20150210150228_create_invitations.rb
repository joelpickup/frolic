class CreateInvitations < ActiveRecord::Migration
  def change
    create_table :invitations do |t|
      t.integer :meetup_id
      t.integer :user_id
      t.string :role
      t.string :status

      t.timestamps
    end
  end
end
