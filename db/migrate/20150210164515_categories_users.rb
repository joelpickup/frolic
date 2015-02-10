class CategoriesUsers < ActiveRecord::Migration
  def change
    create_table :categories_users, id: false do |t|
      t.integer :category_id, index: true
      t.integer :user_id, index: true
    end
  end
end
