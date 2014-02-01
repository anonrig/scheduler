class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :course_id
      t.text :commentText

      t.timestamps
    end
  end
end
