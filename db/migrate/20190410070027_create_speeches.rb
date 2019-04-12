class CreateSpeeches < ActiveRecord::Migration[5.2]
  def change
    create_table :speeches do |t|
      t.references :word, foreign_key: true
      
      t.timestamps
    end
    add_index :speeches, [:word_id, :created_at]
  end
end
